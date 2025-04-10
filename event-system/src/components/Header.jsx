import Link from 'next/link';
import Navigation from './Navigation';
import { SignedIn, SignedOut, UserButton, SignInButton, SignOutButton } from '@clerk/nextjs';


export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            EventSystem
          </Link>
          <Navigation />
          <div className="hidden sm:flex sm:items-center">
            <SignedOut>
              <SignInButton
                mode="modal"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Sign In
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center space-x-4">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 rounded-full",
                      userButtonTrigger: "focus:shadow-none",
                    }
                  }}
                />
                <SignOutButton>
                  <button className="text-gray-500 hover:text-indigo-600 text-sm font-medium transition-colors">
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
