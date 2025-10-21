import { ModeToggle } from "./components/ModeToggle";
// Removed Button and Card imports
export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full space-y-6">
        <div className="flex justify-end">
          <ModeToggle />
        </div>
        <h2>Welcome to BuyBusy!</h2>
        <p>This is your starter scaffold. UI components have been removed.</p>
      </div>
    </div>
  );
}

