import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

const data=[
  {
    "id": 1,
    "name": "Classic White",
    "image":"https://picsum.photos/200",
    "availability": "Available"
  },
  {
    "id": 2,
    "name": "Beige Marble",
    "image":"https://picsum.photos/200",
    "availability": "Not Available"
  },
  {
    "id": 3,
    "name": "Granite Gray",
    "image":"https://picsum.photos/200",
    "availability": "Available"
  },
  {
    "id": 4,
    "name": "Ocean Blue",
    "image":"https://picsum.photos/200",
    "availability": "Not Available"
  },
  {
    "id": 5,
    "name": "Vintage Brown",
    "image":"https://picsum.photos/200",
    "availability": "Available"
  },
  {
    "id": 6,
    "name": "Textured Black",
    "image": "https://picsum.photos/200",
    "availability": "Available"
  },
  {
    "id": 7,
    "name": "Ivory Gold",
    "image":"https://picsum.photos/200",
    "availability": "Not Available"
  },
  {
    "id": 8,
    "name": "Rustic Red",
    "image":"https://picsum.photos/200",
    "availability": "Available"
  },
  {
    "id": 9,
    "name": "Pearl White",
    "image":"https://picsum.photos/200",
    "availability": "Not Available"
  },
  {
    "id": 10,
    "name": "Emerald Green",
    "image":"https://picsum.photos/200",
    "availability": "Available"
  },
  {
    "id": 11,
    "name": "Charcoal Gray",
    "image":"https://picsum.photos/200",
    "availability": "Not Available"
  },
  {
    "id": 12,
    "name": "Sandstone",
    "image":"https://picsum.photos/200",
    "availability": "Available"
  },
  {
    "id": 13,
    "name": "Crimson Red",
    "image":"https://picsum.photos/200",
    "availability": "Available"
  },
  {
    "id": 14,
    "name": "Arctic White",
    "image":"https://picsum.photos/200",
    "availability": "Not Available"
  },
  {
    "id": 15,
    "name": "Deep Blue",
    "image":"https://picsum.photos/200",
    "availability": "Available"
  },
  {
    "id": 16,
    "name": "Sunset Orange",
    "image":"https://picsum.photos/200",
    "availability": "Not Available"
  },
  {
    "id": 17,
    "name": "Natural Slate",
    "image":"https://picsum.photos/200",
    "availability": "Available"
  },
  {
    "id": 18,
    "name": "Blush Pink",
    "image":"https://picsum.photos/200",
    "availability": "Not Available"
  },
  {
    "id": 19,
    "name": "Royal Blue",
    "image":"https://picsum.photos/200",
    "availability": "Available"
  },
  {
    "id": 20,
    "name": "Midnight Black",
    "image": "https://picsum.photos/200",
    "availability": "Available"
  }
]


const Stocks = () => {
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-6 text-center">Tile Collection</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((tile) => (
        <Card key={tile.id} className="shadow-md">
          <CardHeader>
            <CardTitle>{tile.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={tile.image}
              alt={tile.name}
              className="w-full h-32 object-cover rounded-md"
            />
            <p
              className={`mt-2 text-sm font-medium ${
                tile.availability === "Available"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {tile.availability}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
  )
}

export default Stocks

