import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <Loader2 className="w-16 h-16 animate-spin text-black" />
    </div>
  );
}
