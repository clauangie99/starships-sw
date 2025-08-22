// Componentes que conecta API de Star Wars y construye la App
import { useState, useEffect } from 'react';
import StarshipCards from './StarshipCard';

export default function Starship(){
    const [loading, setLoading] = useState<boolean>(true); // Para Carga la Página
    const [error, setError] = useState<string | null>(null); // Pa muestra Error de Página
    const [data, setData] = useState<any[]>([]); // Para muestra los Datos de la Página
  
    // Conexión con la API
    useEffect(() => {
      async function fetchData() {
        try {
            const response = await fetch("https://swapi.py4e.com/api/starships/");
            const data = await response.json();
            setData(data.results);
        }   catch (error) {
            console.error(error);
            setError("Error al cargar los datos");
        }   finally {
            setLoading(false);
        }
      }
  
      fetchData();
    }, []);

    // Componente para cargar página
    // Si loading es true, se muestra un spinner
    if (loading) {
        return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
            <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
        </div>
        );
    }

    // Componente para error de página
    // Si error NO es null, se muestra mensaje de error
    if (error != null) {
        return (
            <>
                <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
                    <div className="bg-red-600 text-red p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-2">Ups! Ha ocurrido un error</h1>
                    </div>
                </div>
            </>

        )
    }
    
    // Componente para mostrar los datos maquillados
    // Return de los datos al front-end
    return ( 
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-8 text-yellow-400 text-center">
            Naves de Star Wars
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((ship) => (
                    <StarshipCards key={ship.url} ship={ship} />
                ))}
            </div>
        </div>
    );
  }
