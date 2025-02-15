import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { User, LogOut, LogIn, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ProfileMenu() {
  const { user, signOut, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleProfileClick = () => {
    if (!loading && isAuthenticated) {
      router.push('/profile');
    } else if (!loading && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access your profile",
        variant: "destructive"
      });
      router.push('/auth');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <User className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {loading ? (
          <DropdownMenuItem disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </DropdownMenuItem>
        ) : isAuthenticated ? (
          <>
            <DropdownMenuItem 
              className="font-medium cursor-pointer"
              onClick={handleProfileClick}
            >
              {user?.email}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={handleProfileClick}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => router.push('/auth')}
          >
            <LogIn className="mr-2 h-4 w-4" />
            <span>Sign In</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 