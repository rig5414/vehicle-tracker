"use client"
import { SearchForm } from "@/components/search/search-form"
import { SearchResults } from "@/components/search/search-results"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { SearchContext, SearchParams } from "@/components/search/search-form"

export default function SearchPage() {
  const [params, setParams] = useState<SearchParams>({ plateNumber: "", location: "", timeRange: "all" })
  const [loading, setLoading] = useState(false)
  return (
    <SearchContext.Provider value={{ params, setParams, loading, setLoading }}>
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Vehicle Search</h1>
          <p className="text-muted-foreground mt-2">
            Search for vehicles by license plate number and view their sighting history
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Parameters</CardTitle>
              <CardDescription>Enter a license plate number to search for vehicle sightings</CardDescription>
            </CardHeader>
            <CardContent>
              <SearchForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>Showing all matching vehicle sightings</CardDescription>
            </CardHeader>
            <CardContent>
              <SearchResults />
            </CardContent>
          </Card>
        </div>
      </div>
    </SearchContext.Provider>
  )
}
