import * as React from 'react';

import SearchAppBar from "./components/SearchAppBar";
import ContactTable from "./components/ContactTable";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  const [prefix, setPrefix] = React.useState('')

  return (
    <QueryClientProvider client={queryClient}>
      <SearchAppBar 
        queryClient={queryClient}
        prefix={prefix} 
        onPrefixChange={setPrefix}
      />
      <ContactTable 
        queryClient={queryClient}
        prefix={prefix}
      />
    </QueryClientProvider>
  );
}
