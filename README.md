# Hikingtrails

## Development

### Prerequisites

* [Node.js (v14 or higher)](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/)
* [GNU Make](https://www.gnu.org/software/make/)

### Setup

#### 1. Clone project and create `.env.local` file

````sh
git clone git@github.com:lencse/hikingtrails.git
cd hikingtrails
cp .env.example .env.local
````

#### 2. Manual step

Populate `.env.local` with [Mapbox](https://www.mapbox.com/) API token. (Ask Lencse for dev token)

````sh
NEXT_PUBLIC_MAPBOX_TOKEN={MAPBOX_API_TOKEN}
````

#### 3. Setup and run

````sh
make public/data/data.json
make dev
````

#### 4. Open in browser

Open [http://localhost:3000](http://localhost:3000)
