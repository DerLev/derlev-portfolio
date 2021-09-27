import { ExclamationIcon } from "@heroicons/react/outline";

export default function Custom500() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className="text-xl font-semibold font-mono flex items-center">
        <ExclamationIcon className="h-10 w-10 mr-1 inline-block" />
        <span>500: Internal Server Error</span>
      </h1>
    </div>
  );
}
