import { ShareForm } from "@/features/share/ui";

export default function SharePage() {
  return (
    <div className="flex flex-col justify-center items-center py-24">
      <div className="border rounded px-4 py-4 bg-primary-foreground shadow-sm space-y-2">
        <div className="text-lg font-semibold">Share a youtube video</div>
        <ShareForm className="space-y-4" />
      </div>
    </div>
  );
}
