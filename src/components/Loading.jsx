import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading() {
  return (
    <main>
      <AiOutlineLoading3Quarters
        className="animate-spin text-indigo-900"
        size={100}
      />
    </main>
  );
}
export default Loading;