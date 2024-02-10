import { SearchIcon } from "@heroicons/react/solid";
import { Card, TextInput } from "@tremor/react";

      
export function SercherComponent () {
   return (
  <Card className="w-10/12 h-4/5 p-auto  row-start-1 row-end-2 mx-auto " decoration="top" decorationColor="indigo">
    <TextInput icon={SearchIcon} placeholder="Search..." />
    
  </Card>

)}