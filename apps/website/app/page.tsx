import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function Home() {
  return (
    <div>
      <div>Hello World</div>
      <Button>Example Shadcn Button</Button>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Example checkbox
        </label>
      </div>
    </div>
  );
}
