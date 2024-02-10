'use client'

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import ReactAudioPlayer from 'react-audio-player'
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useStore } from "@/store";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Slider } from "./ui/slider";

export function EditBackground() {
  const [open, setOpen] = useState(false)
  const { backgroundType, soundsVolume } = useStore()

  function updateSoundVolume(type: string, volume: number) {
    useStore.setState({
      soundsVolume: {
        ...soundsVolume,
        [type]: {
          volume
        }
      }
    })
  }

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
            <label htmlFor="default" className="cursor-pointer">Default</label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="rainy" id="rainy" />
            <label htmlFor="rainy" className="cursor-pointer">Rainy</label>

            {backgroundType === 'rainy' && (
              <Slider defaultValue={[50]}
                max={100}
                step={1}
                value={[soundsVolume.rain.volume * 100]}
                onValueChange={([value]) => updateSoundVolume('rain', value / 100)}
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="sea" id="sea" />
            <label htmlFor="sea" className="cursor-pointer">Sea</label>

            {backgroundType === 'sea' && (
              <Slider
                max={100}
                step={1}
                value={[soundsVolume.seaWaves.volume * 100]}
                onValueChange={([value]) => updateSoundVolume('seaWaves', value / 100)}
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="keyboard" id="keyboard" />
            <label htmlFor="keyboard" className="cursor-pointer">Keyboard</label>

            {backgroundType === 'keyboard' && (
              <Slider
                max={100}
                step={1}
                value={[soundsVolume.keyboard.volume * 100]}
                onValueChange={([value]) => updateSoundVolume('keyboard', value / 100)}
              />
            )}
          </div>
        </RadioGroup>
      </PopoverContent>
    </Popover>
  )
}