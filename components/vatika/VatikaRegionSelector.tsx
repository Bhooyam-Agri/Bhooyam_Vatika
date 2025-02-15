import { useState, useMemo } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plant } from '@/lib/plants';

interface VatikaRegionSelectorProps {
  plants: Plant[];
  onRegionChange: (region: string) => void;
}

export function VatikaRegionSelector({ plants, onRegionChange }: VatikaRegionSelectorProps) {
  const [open, setOpen] = useState(false);
  
  // Get unique regions and their counts
  const regions = useMemo(() => {
    const regionCounts = new Map<string, number>();
    plants.forEach(plant => {
      plant.regions.forEach(region => {
        regionCounts.set(region, (regionCounts.get(region) || 0) + 1);
      });
    });
    
    const allRegions = [
      { id: 'all', name: 'All Regions', count: plants.length },
      ...Array.from(regionCounts.entries()).map(([region, count]) => ({
        id: region.toLowerCase(),
        name: region,
        count
      }))
    ];
    
    return allRegions.sort((a, b) => b.count - a.count);
  }, [plants]);

  const [selectedRegion, setSelectedRegion] = useState(regions[0]);

  const handleRegionSelect = (region: typeof regions[0]) => {
    setSelectedRegion(region);
    setOpen(false);
    onRegionChange(region.id);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedRegion.name} {selectedRegion.count > 0 && `(${selectedRegion.count})`}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search regions..." />
          <CommandEmpty>No region found.</CommandEmpty>
          <ScrollArea className="h-64">
            <CommandGroup>
              {regions.map((region) => (
                <CommandItem
                  key={region.id}
                  onSelect={() => handleRegionSelect(region)}
                  className="cursor-pointer"
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      selectedRegion.id === region.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  {region.name} {region.count > 0 && `(${region.count})`}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
} 