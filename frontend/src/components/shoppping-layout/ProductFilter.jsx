/* eslint-disable react/jsx-key */
import { filterOptions } from "@/config/FormIndex";
import { Fragment, useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { SelectSeparator } from "../ui/select";
import { Button } from "../ui/button";

const ProductFilter = ({ filters, handleFilter }) => {

  const [isFilterHidden, setIsFilterHidden]=useState(false);
  const [showFilter, setshowFilter]=useState("Show Filter");

  function toogleFilterinMobile(){
    if(isFilterHidden==false){
      setIsFilterHidden(true)
      setshowFilter("Hide Filter")
    }else{
      setIsFilterHidden(false);
      setshowFilter("Show Filter")
    }
    
  }
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="flex justify-between"><h2 className="font-bold text-xl">Product Filters </h2> <Button className="md:hidden" onClick={()=>toogleFilterinMobile()}>{showFilter}</Button></div>
        
        {/* <SelectSeparator /> */}

      {
      isFilterHidden? 
        <div className="sm:hidden p-4 space-y-5 ">
        {Object.keys(filterOptions).map((KeyItems) => (
          <Fragment>
            <div>
              <h3 className="text-lg mb-2 capitalize font-bold ">
                {KeyItems}
              </h3>
              <div className="flex flex-wrap md:grid gap-5 mb-2">
                {filterOptions[KeyItems].map((item) => (
                  <Label className="flex gap-2">
                    <Checkbox
                      onCheckedChange={() => handleFilter(KeyItems, item.id)}
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[KeyItems] &&
                        filters[KeyItems].indexOf(item.id) > -1
                      }
                    />{" "}
                    {item.label}
                  </Label>
                ))}
                <SelectSeparator />
              </div>
            </div>
          </Fragment>
        ))}
      </div>: null
      }



        <div className="hidden sm:block p-4 space-y-5 ">
          {Object.keys(filterOptions).map((KeyItems) => (
            <Fragment>
              <div>
                <h3 className="text-lg mb-2 capitalize font-bold ">
                  {KeyItems}
                </h3>
                <div className="grid gap-3 mb-2">
                  {filterOptions[KeyItems].map((item) => (
                    <Label className="flex gap-2">
                      <Checkbox
                        onCheckedChange={() => handleFilter(KeyItems, item.id)}
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[KeyItems] &&
                          filters[KeyItems].indexOf(item.id) > -1
                        }
                      />{" "}
                      {item.label}
                    </Label>
                  ))}
                  <SelectSeparator />
                </div>
              </div>
            </Fragment>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default ProductFilter;
