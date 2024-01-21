'use client'

import { Timer } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { defaultTimes } from "@/utils/constants";
import { Input } from "./ui/input";
import { useState } from "react";
import { useStore } from "@/store";

const formSchema = z.object({
  pomodoro: z.coerce.number().refine((number) => number > 0, {
    message: "Time must be greater than zero."
  }),
  shortBreak: z.coerce.number().refine((number) => number > 0, {
    message: "Time must be greater than zero."
  }),
  longBreak: z.coerce.number().refine((number) => number > 0, {
    message: "Time must be greater than zero."
  }),
})

export function EditTimer() {
  const [open, setOpen] = useState(false)
  const { editTimer } = useStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pomodoro: (defaultTimes.pomodoro / 60), // 25 minutes
      shortBreak: (defaultTimes.shortBreak / 60), // 05 minutes
      longBreak: (defaultTimes.longBreak / 60), // 15 minutes
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { pomodoro, shortBreak, longBreak } = values

    editTimer({
      pomodoroTimer: pomodoro,
      shortBreakTimer: shortBreak,
      longBreakTimer: longBreak
    })

    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Timer className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Edit Pomodoro Timers</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent side="top" onOpenAutoFocus={(event) => event.preventDefault()}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="pomodoro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pomodoro Timer (minutes)</FormLabel>
                  <FormControl>
                    <Input placeholder="25" type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortBreak"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Break Timer (minutes)</FormLabel>
                  <FormControl>
                    <Input placeholder="5" type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longBreak"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long Break Timer (minutes)</FormLabel>
                  <FormControl>
                    <Input placeholder="15" type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-sm">
              Updating these times will reset Pomodoro to the initial state, to the first cycle with the new times defined here.
            </p>

            <Button
              className="w-full"
              type="submit"
              variant="outline"
            >
              Update
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>

  )
}