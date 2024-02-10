'use client'

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useStore } from "@/store";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export function EditBackground() {
  const [open, setOpen] = useState(false)
  const { backgroundType } = useStore()

  function setSelectedBackgroundType(value: string) {
    useStore.setState({
      backgroundType: value
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <ImageIcon className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Choose Background</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent side="top" onOpenAutoFocus={(event) => event.preventDefault()}>
        <RadioGroup
          onValueChange={setSelectedBackgroundType}
          defaultValue={backgroundType}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="default" id="default" />
            <label htmlFor="default">Default</label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="rainy" id="rainy" />
            <label htmlFor="rainy">Rainy</label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="sea" id="sea" />
            <label htmlFor="sea">Sea</label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="keyboard" id="keyboard" />
            <label htmlFor="keyboard">Keyboard</label>
          </div>
        </RadioGroup>
      </PopoverContent>
    </Popover>
  )
}