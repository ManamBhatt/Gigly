"use client"

import { useState } from "react"
import { Calendar, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

// Mock data for artists
const artists = [
  {
    id: 1,
    name: "Jazz Ensemble",
    image: "/placeholder.svg?height=100&width=100",
    genres: ["Jazz", "Swing"],
    socialMedia: {
      instagram: "https://instagram.com/jazzensemble",
      facebook: "https://facebook.com/jazzensemble",
      youtube: "https://youtube.com/jazzensemble",
    },
    videoClip: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    phone: "+1 (555) 123-4567",
    email: "booking@jazzensemble.com",
  },
  {
    id: 2,
    name: "Rock Trio",
    image: "/placeholder.svg?height=100&width=100",
    genres: ["Rock", "Alternative"],
    socialMedia: {
      instagram: "https://instagram.com/rocktrio",
      facebook: "https://facebook.com/rocktrio",
      youtube: "https://youtube.com/rocktrio",
    },
    videoClip: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    phone: "+1 (555) 987-6543",
    email: "booking@rocktrio.com",
  },
  // Add more mock artists here...
]

export default function ArtistCatalogue() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Gigly Artist Catalogue</h1>
      <Input
        type="search"
        placeholder="Search artists..."
        className="mb-8"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtists.map((artist) => (
          <Card key={artist.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <CardTitle>{artist.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-2">Genres: {artist.genres.join(", ")}</p>
              <div className="flex space-x-2 mb-4">
                {Object.entries(artist.socialMedia).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {platform}
                  </a>
                ))}
              </div>
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  src={artist.videoClip}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Calendar className="mr-2 h-4 w-4" /> Check Availability
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Availability for {artist.name}</DialogTitle>
                    <DialogDescription>
                      View the artist's availability and contact them for booking.
                    </DialogDescription>
                  </DialogHeader>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Contact for Booking:</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4" />
                      <p>{artist.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <p>{artist.email}</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4" onClick={() => window.open(`mailto:${artist.email}`)}>
                    <Mail className="mr-2 h-4 w-4" /> Send Email
                  </Button>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
