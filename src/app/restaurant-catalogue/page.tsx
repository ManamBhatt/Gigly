"use client"

import { useState } from "react"
import { Calendar as CalendarIcon, MapPin, Phone, Mail, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

// Mock data for restaurants
const restaurants = [
  {
    id: 1,
    name: "The Melodic Bistro",
    image: "/placeholder.svg?height=100&width=100",
    location: "123 Harmony Street, Musicville",
    phone: "+1 (555) 123-4567",
    email: "contact@melodicbistro.com",
    description: "A cozy bistro with live jazz performances every evening.",
    availableSlots: [
      { date: "2023-06-15", slots: ["7:00 PM", "8:30 PM"] },
      { date: "2023-06-16", slots: ["6:30 PM", "8:00 PM", "9:30 PM"] },
      { date: "2023-06-17", slots: ["7:30 PM", "9:00 PM"] },
    ],
  },
  {
    id: 2,
    name: "Rhythm & Bites",
    image: "/placeholder.svg?height=100&width=100",
    location: "456 Beat Avenue, Groovetown",
    phone: "+1 (555) 987-6543",
    email: "info@rhythmandbites.com",
    description: "An eclectic eatery featuring indie bands and fusion cuisine.",
    availableSlots: [
      { date: "2023-06-15", slots: ["6:00 PM", "8:00 PM"] },
      { date: "2023-06-16", slots: ["7:00 PM", "9:00 PM"] },
      { date: "2023-06-17", slots: ["6:30 PM", "8:30 PM"] },
    ],
  },
  // Add more restaurants as needed
]

export default function RestaurantCatalogue() {
  const [searchTerm, setSearchTerm] = useState("")
  const [date, setDate] = useState<Date>()

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gigly Restaurant Catalogue</h1>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search restaurants..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRestaurants.map((restaurant) => (
          <Card key={restaurant.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <CardTitle>{restaurant.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                <CardDescription>{restaurant.location}</CardDescription>
              </div>
              <div className="flex items-center mb-4">
                <Phone className="w-4 h-4 mr-2" />
                <CardDescription>{restaurant.phone}</CardDescription>
              </div>
              <Separator className="my-4" />
              <p className="text-sm">{restaurant.description}</p>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <h4 className="font-semibold mb-2 flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Available Booking Slots
              </h4>
              <div className="w-full mb-4"> {/* Space below slots */}
                {restaurant.availableSlots.slice(0, 3).map((day) => (
                  <div key={day.date} className="mb-2">
                    <p className="text-sm font-medium">{day.date}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {day.slots.slice(0, 5).map((slot) => (
                        <Button key={slot} variant="outline" size="sm">
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-4">Check Availability</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Check Availability</DialogTitle>
                    <DialogDescription>
                      Select a date to check availability for {restaurant.name}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal ${
                            !date && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {date && (
                      <div className="space-y-2 mt-4"> {/* Added margin top */}
                        <h5 className="font-semibold">Available Slots:</h5>
                        <div className="grid grid-cols-2 gap-2">
                          {restaurant.availableSlots
                            .find((day) => day.date === format(date, "yyyy-MM-dd"))
                            ?.slots.map((slot) => (
                              <Button key={slot} variant="outline" size="sm">
                                {slot}
                              </Button>
                            )) || <p className="col-span-2">No available slots for this date.</p>}
                        </div>
                      </div>
                    )}
                    <Separator className="my-4" />
                    <div>
                      <h5 className="font-semibold mb-2">Contact Information:</h5>
                      <p className="flex items-center mb-2">
                        <Phone className="w-4 h-4 mr-2" />
                        {restaurant.phone}
                      </p>
                      <p className="flex items-center mb-2">
                        <Mail className="w-4 h-4 mr-2" />
                        {restaurant.email}
                      </p>
                      <Button className="mt-2">Send Enquiry Email</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
