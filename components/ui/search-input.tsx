import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty } from '@/components/ui/command';
import { Plant, usePlantsStore } from '@/lib/plants';
import { Leaf } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  onSelect?: (plant: Plant) => void;
}

export function SearchInput({ placeholder = "Search...", className, onSelect }: SearchInputProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Plant[]>([]);
  const router = useRouter();
  const plants = usePlantsStore(state => state.plants);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = plants.filter((plant: Plant) => 
        plant.name.toLowerCase().includes(query.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(query.toLowerCase()) ||
        plant.conditions.some((condition: string) => condition.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query, plants]);

  return (
    <Command className={`relative rounded-lg border shadow-md ${className}`}>
      <CommandInput
        placeholder={placeholder}
        value={query}
        onValueChange={setQuery}
      />
      {results.length > 0 && (
        <CommandList className="absolute top-full left-0 right-0 z-50 mt-1 max-h-64 w-full overflow-auto rounded-md bg-popover p-1 shadow-md">
          {results.map((plant) => (
            <CommandItem
              key={plant.id}
              value={plant.name}
              onSelect={() => {
                if (onSelect) {
                  onSelect(plant);
                } else {
                  router.push(`/plant-library/${plant.id}`);
                }
                setQuery('');
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img 
                src={plant.image} 
                alt={plant.name} 
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">{plant.name}</div>
                <div className="text-sm text-muted-foreground">{plant.scientificName}</div>
              </div>
            </CommandItem>
          ))}
        </CommandList>
      )}
    </Command>
  );
}