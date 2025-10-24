import "./index.css";
import Feasibility from "./FeasibilityReport";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  // Enable React-Query (v4)
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Feasibility />
    </QueryClientProvider>
  );
}

export default App;
