<?php

namespace Database\Seeders;

use App\Models\Cities;
use App\Models\Ciudades;
use App\Models\States;
use Illuminate\Database\Seeder;

class CitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crear las ciudades de cada States
        $ciudades = [
            //Ciudades de Venezuela
            // Amazonas
            ['name' => 'Puerto Ayacucho', 'state_id' => States::where('name', 'Amazonas')->first()->id],
            ['name' => 'San Fernando de Atabapo', 'state_id' => States::where('name', 'Amazonas')->first()->id],
            ['name' => 'La Esmeralda', 'state_id' => States::where('name', 'Amazonas')->first()->id],
            ['name' => 'Maroa', 'state_id' => States::where('name', 'Amazonas')->first()->id],
            ['name' => 'Isla Ratón', 'state_id' => States::where('name', 'Amazonas')->first()->id],
            ['name' => 'San Juan de Manapiare', 'state_id' => States::where('name', 'Amazonas')->first()->id],
            ['name' => 'San Carlos de Río Negro', 'state_id' => States::where('name', 'Amazonas')->first()->id],

            // Anzoátegui
            ['name' => 'Barcelona', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],
            ['name' => 'Puerto La Cruz', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],
            ['name' => 'Lechería', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],
            ['name' => 'El Tigre', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],
            ['name' => 'Anaco', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],
            ['name' => 'Puerto Píritu', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],
            ['name' => 'Cantaura', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],
            ['name' => 'San José de Guanipa', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],
            ['name' => 'Guanta ', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],
            ['name' => 'Pariaguan ', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],
            ['name' => 'Aragua De Barcelona', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],
            ['name' => 'Clarines ', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],
            ['name' => 'Ciudad Orinoco', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],
            ['name' => 'San Mateo', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],
            ['name' => 'Onoto ', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],
            ['name' => 'Valle de Guanape', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],
            ['name' => 'El Chaparro', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],
            ['name' => 'Boca de Uchire', 'state_id' => States::where('name', 'Anzoátegui')->first()->id],

            // Apure
            ['name' => 'San Fernando de Apure', 'state_id' => States::where('name', 'Apure')->first()->id],
            ['name' => 'Achaguas', 'state_id' => States::where('name', 'Apure')->first()->id],
            ['name' => 'Biruaca', 'state_id' => States::where('name', 'Apure')->first()->id],
            ['name' => 'Guasdualito', 'state_id' => States::where('name', 'Apure')->first()->id],
            ['name' => 'Bruzual', 'state_id' => States::where('name', 'Apure')->first()->id],

            // Aragua
            ['name' => 'San Mateo', 'state_id' => States::where('name', 'Aragua')->first()->id],
            ['name' => 'Camatagua', 'state_id' => States::where('name', 'Aragua')->first()->id],
            ['name' => 'Santa Rita', 'state_id' => States::where('name', 'Aragua')->first()->id],
            ['name' => 'Maracay', 'state_id' => States::where('name', 'Aragua')->first()->id],
            ['name' => 'Santa Cruz', 'state_id' => States::where('name', 'Aragua')->first()->id],
            ['name' => 'La Victoria', 'state_id' => States::where('name', 'Aragua')->first()->id],
            ['name' => 'El Consejo', 'state_id' => States::where('name', 'Aragua')->first()->id],
            ['name' => 'Palo Negro', 'state_id' => States::where('name', 'Aragua')->first()->id],
            ['name' => 'El Limón', 'state_id' => States::where('name', 'Aragua')->first()->id],
            ['name' => 'Ocumare de la Costa', 'state_id' => States::where('name', 'Aragua')->first()->id],
            ['name' => 'San Casimiro', 'state_id' => States::where('name', 'Aragua')->first()->id],
            ['name' => 'San Sebastián', 'state_id' => States::where('name', 'Aragua')->first()->id],
            ['name' => 'Turmero', 'state_id' => States::where('name', 'Aragua')->first()->id],
            ['name' => 'Las Tejerías', 'state_id' => States::where('name', 'Aragua')->first()->id],
            ['name' => 'Cagua', 'state_id' => States::where('name', 'Aragua')->first()->id],
            ['name' => 'Colonia Tovar', 'state_id' => States::where('name', 'Aragua')->first()->id],
            ['name' => 'Barbacoas', 'state_id' => States::where('name', 'Aragua')->first()->id],
            ['name' => 'Villa de Cura', 'state_id' => States::where('name', 'Aragua')->first()->id],

            // Barinas
            ['name' => 'Barinas', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Socopó', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Barinas', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Ciudad Bolivia', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Barinitas', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Santa Bárbara', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Sabaneta', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Barrancas', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Obispos', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Los Guasimitos', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Libertad', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Arauquita', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Las Casitas del Vegón de Nutrias', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'La Caramuca	', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Arismendi', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Quebrada Seca', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Dolores', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Chameta', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'La Mula	', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'La Luz	', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Curbatí', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'Bum-Bum	', 'state_id' => States::where('name', 'Barinas')->first()->id],
            ['name' => 'San Silvestre	', 'state_id' => States::where('name', 'Barinas')->first()->id],

            // Bolívar
            ['name' => 'Ciudad Guayana ', 'state_id' => States::where('name', 'Bolívar')->first()->id],
            ['name' => 'Ciudad Bolívar', 'state_id' => States::where('name', 'Bolívar')->first()->id],
            ['name' => 'Puerto Ordaz', 'state_id' => States::where('name', 'Bolívar')->first()->id],
            ['name' => 'Upata', 'state_id' => States::where('name', 'Bolívar')->first()->id],
            ['name' => 'Caicara del Orinoco', 'state_id' => States::where('name', 'Bolívar')->first()->id],
            ['name' => 'Ciudad Piar', 'state_id' => States::where('name', 'Bolívar')->first()->id],
            ['name' => 'El Callao', 'state_id' => States::where('name', 'Bolívar')->first()->id],
            ['name' => 'El Dorado', 'state_id' => States::where('name', 'Bolívar')->first()->id],
            ['name' => 'Maripa', 'state_id' => States::where('name', 'Bolívar')->first()->id],
            ['name' => 'Santa Elena de Uairén', 'state_id' => States::where('name', 'Bolívar')->first()->id],
            ['name' => 'Tumeremo', 'state_id' => States::where('name', 'Bolívar')->first()->id],
            ['name' => 'Guasipati', 'state_id' => States::where('name', 'Bolívar')->first()->id],
            ['name' => 'El Palmar', 'state_id' => States::where('name', 'Bolívar')->first()->id],

            // Carabobo
            ['name' => 'Valencia', 'state_id' => States::where('name', 'Carabobo')->first()->id],
            ['name' => 'Puerto Cabello', 'state_id' => States::where('name', 'Carabobo')->first()->id],
            ['name' => 'Naguanagua', 'state_id' => States::where('name', 'Carabobo')->first()->id],
            ['name' => 'Tocuyito', 'state_id' => States::where('name', 'Carabobo')->first()->id],
            ['name' => 'Guacara', 'state_id' => States::where('name', 'Carabobo')->first()->id],
            ['name' => 'Mariara', 'state_id' => States::where('name', 'Carabobo')->first()->id],
            ['name' => 'Bejuma', 'state_id' => States::where('name', 'Carabobo')->first()->id],
            ['name' => 'Morón', 'state_id' => States::where('name', 'Carabobo')->first()->id],
            ['name' => 'San Joaquín ', 'state_id' => States::where('name', 'Carabobo')->first()->id],
            ['name' => 'Güigüe', 'state_id' => States::where('name', 'Carabobo')->first()->id],

            // Cojedes
            ['name' => 'San Carlos', 'state_id' => States::where('name', 'Cojedes')->first()->id],
            ['name' => 'Tinaquillo', 'state_id' => States::where('name', 'Cojedes')->first()->id],
            ['name' => 'Tinaco', 'state_id' => States::where('name', 'Cojedes')->first()->id],
            ['name' => 'Las Vegas', 'state_id' => States::where('name', 'Cojedes')->first()->id],
            ['name' => 'El Pao', 'state_id' => States::where('name', 'Cojedes')->first()->id],
            ['name' => 'Macapo', 'state_id' => States::where('name', 'Cojedes')->first()->id],

            // Delta Amacuro
            ['name' => 'Tucupita', 'state_id' => States::where('name', 'Delta Amacuro')->first()->id],
            ['name' => 'Sierra Imataca', 'state_id' => States::where('name', 'Delta Amacuro')->first()->id],
            ['name' => 'Pedernales', 'state_id' => States::where('name', 'Delta Amacuro')->first()->id],
            ['name' => 'Curiapo', 'state_id' => States::where('name', 'Delta Amacuro')->first()->id],

            // Distrito Capital
            ['name' => 'Baruta', 'state_id' => States::where('name', 'Distrito Capital')->first()->id],
            ['name' => ' El Hatillo', 'state_id' => States::where('name', 'Distrito Capital')->first()->id],
            ['name' => 'Sucre', 'state_id' => States::where('name', 'Distrito Capital')->first()->id],
            ['name' => 'Curiapo', 'state_id' => States::where('name', 'Distrito Capital')->first()->id],

            // Falcón
            ['name' => 'Coro', 'state_id' => States::where('name', 'Falcón')->first()->id],
            ['name' => 'Punto Fijo', 'state_id' => States::where('name', 'Falcón')->first()->id],
            ['name' => 'Churuguara', 'state_id' => States::where('name', 'Falcón')->first()->id],
            ['name' => 'Tucacas', 'state_id' => States::where('name', 'Falcón')->first()->id],
            ['name' => 'Judibana', 'state_id' => States::where('name', 'Falcón')->first()->id],
            ['name' => 'Santa Ana de Coro', 'state_id' => States::where('name', 'Falcón')->first()->id],
            ['name' => 'La Vela de Coro', 'state_id' => States::where('name', 'Falcón')->first()->id],
            ['name' => 'Chichiriviche', 'state_id' => States::where('name', 'Falcón')->first()->id],
            ['name' => 'Adícora', 'state_id' => States::where('name', 'Falcón')->first()->id],
            ['name' => 'Cumarebo', 'state_id' => States::where('name', 'Falcón')->first()->id],
            ['name' => 'Dabajuro', 'state_id' => States::where('name', 'Falcón')->first()->id],
            ['name' => 'San Juan de Los Cayos', 'state_id' => States::where('name', 'Falcón')->first()->id],
            ['name' => 'Santa Cruz de Bucarat', 'state_id' => States::where('name', 'Falcón')->first()->id],
            ['name' => 'Tocopero', 'state_id' => States::where('name', 'Falcón')->first()->id],
            ['name' => 'Capatárida', 'state_id' => States::where('name', 'Falcón')->first()->id],

            // Guárico
            ['name' => 'San Juan de Los Morros', 'state_id' => States::where('name', 'Guárico')->first()->id],
            ['name' => 'Valle de la Pascua', 'state_id' => States::where('name', 'Guárico')->first()->id],
            ['name' => 'Calabozo', 'state_id' => States::where('name', 'Guárico')->first()->id],
            ['name' => 'Zaraza', 'state_id' => States::where('name', 'Guárico')->first()->id],
            ['name' => 'Altagracia de Orituco', 'state_id' => States::where('name', 'Guárico')->first()->id],

            // Lara
            ['name' => 'Barquisimeto', 'state_id' => States::where('name', 'Lara')->first()->id],
            ['name' => 'Carora', 'state_id' => States::where('name', 'Lara')->first()->id],
            ['name' => 'El Tocuyo', 'state_id' => States::where('name', 'Lara')->first()->id],
            ['name' => 'Quibor', 'state_id' => States::where('name', 'Lara')->first()->id],
            ['name' => 'Cabudare', 'state_id' => States::where('name', 'Lara')->first()->id],

            // Mérida
            ['name' => 'Mérida', 'state_id' => States::where('name', 'Mérida')->first()->id],
            ['name' => 'El Vigia', 'state_id' => States::where('name', 'Mérida')->first()->id],
            ['name' => 'Ejido', 'state_id' => States::where('name', 'Mérida')->first()->id],
            ['name' => 'Lagunllas', 'state_id' => States::where('name', 'Mérida')->first()->id],
            ['name' => 'Tovar', 'state_id' => States::where('name', 'Mérida')->first()->id],

            // Miranda
            ['name' => 'Los Teques', 'state_id' => States::where('name', 'Miranda')->first()->id],
            ['name' => 'Guatire', 'state_id' => States::where('name', 'Miranda')->first()->id],
            ['name' => 'Guarenas', 'state_id' => States::where('name', 'Miranda')->first()->id],
            ['name' => 'Cúa,', 'state_id' => States::where('name', 'Miranda')->first()->id],
            ['name' => 'Santa Teresa del Tuy', 'state_id' => States::where('name', 'Miranda')->first()->id],
            ['name' => 'San Francisco de Yare', 'state_id' => States::where('name', 'Miranda')->first()->id],
            ['name' => 'Caucagua', 'state_id' => States::where('name', 'Miranda')->first()->id],
            ['name' => 'San Antonio de Los Altos', 'state_id' => States::where('name', 'Miranda')->first()->id],
            ['name' => 'Santa Lucía', 'state_id' => States::where('name', 'Miranda')->first()->id],
            ['name' => 'Higuerote', 'state_id' => States::where('name', 'Miranda')->first()->id],
            ['name' => 'Río Chico', 'state_id' => States::where('name', 'Miranda')->first()->id],

            // Monagas
            ['name' => 'Punta de Mata,', 'state_id' => States::where('name', 'Monagas')->first()->id],
            ['name' => 'Caripe', 'state_id' => States::where('name', 'Monagas')->first()->id],
            ['name' => 'Caripito', 'state_id' => States::where('name', 'Monagas')->first()->id],
            ['name' => 'Maturín', 'state_id' => States::where('name', 'Monagas')->first()->id],
            ['name' => 'Temblador', 'state_id' => States::where('name', 'Monagas')->first()->id],

            // Nueva Esparta
            ['name' => 'La Asunción', 'state_id' => States::where('name', 'Nueva Esparta')->first()->id],
            ['name' => 'Porlamar', 'state_id' => States::where('name', 'Nueva Esparta')->first()->id],
            ['name' => 'Juan Griego', 'state_id' => States::where('name', 'Nueva Esparta')->first()->id],
            ['name' => 'Punta de Piedras', 'state_id' => States::where('name', 'Nueva Esparta')->first()->id],
            ['name' => 'Pampatar', 'state_id' => States::where('name', 'Nueva Esparta')->first()->id],
            ['name' => 'San Juan Bautista', 'state_id' => States::where('name', 'Nueva Esparta')->first()->id],
            ['name' => 'El Valle del Espíritu Santo', 'state_id' => States::where('name', 'Nueva Esparta')->first()->id],

            // Portuguesa
            ['name' => 'Guanare', 'state_id' => States::where('name', 'Portuguesa')->first()->id],
            ['name' => 'Acarigua', 'state_id' => States::where('name', 'Portuguesa')->first()->id],
            ['name' => 'Araure', 'state_id' => States::where('name', 'Portuguesa')->first()->id],

            // Sucre
            ['name' => 'Cumaná', 'state_id' => States::where('name', 'Sucre')->first()->id],
            ['name' => 'Carúpano', 'state_id' => States::where('name', 'Sucre')->first()->id],
            ['name' => 'Cariaco', 'state_id' => States::where('name', 'Sucre')->first()->id],

            // Táchira
            ['name' => 'San Cristóbal', 'state_id' => States::where('name', 'Táchira')->first()->id],
            ['name' => 'Táriba,', 'state_id' => States::where('name', 'Táchira')->first()->id],
            ['name' => 'Rubio', 'state_id' => States::where('name', 'Táchira')->first()->id],
            ['name' => 'La Grita', 'state_id' => States::where('name', 'Táchira')->first()->id],
            ['name' => 'San Antonio del Táchira', 'state_id' => States::where('name', 'Táchira')->first()->id],
            ['name' => 'La Fría', 'state_id' => States::where('name', 'Táchira')->first()->id],
            ['name' => 'Santa Ana del Táchira', 'state_id' => States::where('name', 'Táchira')->first()->id],
            ['name' => 'Capacho Nuevo', 'state_id' => States::where('name', 'Táchira')->first()->id],
            ['name' => 'San Juan de Colón', 'state_id' => States::where('name', 'Táchira')->first()->id],
            ['name' => 'Cordero', 'state_id' => States::where('name', 'Táchira')->first()->id],
            ['name' => 'Capacho Viejo', 'state_id' => States::where('name', 'Táchira')->first()->id],

            // Trujillo
            ['name' => 'Trujillo', 'state_id' => States::where('name', 'Trujillo')->first()->id],
            ['name' => 'Valera', 'state_id' => States::where('name', 'Trujillo')->first()->id],
            ['name' => 'Boconó', 'state_id' => States::where('name', 'Trujillo')->first()->id],
            ['name' => 'Carvajal', 'state_id' => States::where('name', 'Trujillo')->first()->id],

            // La Guaira
            ['name' => 'La Guaira', 'state_id' => States::where('name', 'La Guaira')->first()->id],
            ['name' => 'Caraballeda', 'state_id' => States::where('name', 'La Guaira')->first()->id],
            ['name' => 'Catia La Mar', 'state_id' => States::where('name', 'La Guaira')->first()->id],
            ['name' => 'Macuto', 'state_id' => States::where('name', 'La Guaira')->first()->id],
            ['name' => 'Maiquetía', 'state_id' => States::where('name', 'La Guaira')->first()->id],

            // Yaracuy
            ['name' => 'San Felipe', 'state_id' => States::where('name', 'Yaracuy')->first()->id],
            ['name' => 'Independencia', 'state_id' => States::where('name', 'Yaracuy')->first()->id],
            ['name' => 'Chivacoa', 'state_id' => States::where('name', 'Yaracuy')->first()->id],
            ['name' => 'Nirgua', 'state_id' => States::where('name', 'Yaracuy')->first()->id],
            ['name' => 'Cocorote', 'state_id' => States::where('name', 'Yaracuy')->first()->id],
            ['name' => 'Urachiche', 'state_id' => States::where('name', 'Yaracuy')->first()->id],

            // Zulia
            ['name' => 'Maracaibo', 'state_id' => States::where('name', 'Zulia')->first()->id],
            ['name' => 'San Francisco', 'state_id' => States::where('name', 'Zulia')->first()->id],
            ['name' => 'Cabimas', 'state_id' => States::where('name', 'Zulia')->first()->id],
            ['name' => 'Ciudad Ojeda', 'state_id' => States::where('name', 'Zulia')->first()->id],
            ['name' => 'Santa Bárbara del Zulia', 'state_id' => States::where('name', 'Zulia')->first()->id],
            ['name' => 'Rosario de Perijá', 'state_id' => States::where('name', 'Zulia')->first()->id],
            ['name' => 'Machiques', 'state_id' => States::where('name', 'Zulia')->first()->id],
            ['name' => 'La Concepción', 'state_id' => States::where('name', 'Zulia')->first()->id],
            ['name' => 'Los Puertos de Altagracia', 'state_id' => States::where('name', 'Zulia')->first()->id],

            //Ciudades de Republica Dominicana
            // Azua
            ['name' => 'Azua de Compostela', 'state_id' => States::where('name', 'Azua')->first()->id],
            ['name' => 'Estebanía', 'state_id' => States::where('name', 'Azua')->first()->id],
            ['name' => 'Guayabal', 'state_id' => States::where('name', 'Azua')->first()->id],
            ['name' => 'Las Charcas', 'state_id' => States::where('name', 'Azua')->first()->id],
            ['name' => 'Las Yayas de Viajama', 'state_id' => States::where('name', 'Azua')->first()->id],
            ['name' => 'Padre Las Casas', 'state_id' => States::where('name', 'Azua')->first()->id],
            ['name' => 'Peralta', 'state_id' => States::where('name', 'Azua')->first()->id],
            ['name' => 'Pueblo Viejo', 'state_id' => States::where('name', 'Azua')->first()->id],
            ['name' => 'Sabana Yegua', 'state_id' => States::where('name', 'Azua')->first()->id],
            ['name' => 'Tábara Arriba', 'state_id' => States::where('name', 'Azua')->first()->id],

            // Bahoruco
            ['name' => 'Neiba', 'state_id' => States::where('name', 'Bahoruco')->first()->id],
            ['name' => 'Galván', 'state_id' => States::where('name', 'Bahoruco')->first()->id],
            ['name' => 'Los Ríos', 'state_id' => States::where('name', 'Bahoruco')->first()->id],
            ['name' => 'Tamayo', 'state_id' => States::where('name', 'Bahoruco')->first()->id],
            ['name' => 'Uvilla', 'state_id' => States::where('name', 'Bahoruco')->first()->id],
            ['name' => 'Mella', 'state_id' => States::where('name', 'Bahoruco')->first()->id],
            ['name' => 'El Palmar', 'state_id' => States::where('name', 'Bahoruco')->first()->id],
            ['name' => 'Monserrat', 'state_id' => States::where('name', 'Bahoruco')->first()->id],

            // Barahona
            ['name' => 'Barahona', 'state_id' => States::where('name', 'Barahona')->first()->id],
            ['name' => 'Cabral', 'state_id' => States::where('name', 'Barahona')->first()->id],
            ['name' => 'El Peñón', 'state_id' => States::where('name', 'Barahona')->first()->id],
            ['name' => 'Enriquillo', 'state_id' => States::where('name', 'Barahona')->first()->id],
            ['name' => 'Fundación', 'state_id' => States::where('name', 'Barahona')->first()->id],
            ['name' => 'Jaquimeyes', 'state_id' => States::where('name', 'Barahona')->first()->id],
            ['name' => 'La Ciénaga', 'state_id' => States::where('name', 'Barahona')->first()->id],
            ['name' => 'Las Salinas', 'state_id' => States::where('name', 'Barahona')->first()->id],
            ['name' => 'Paraíso', 'state_id' => States::where('name', 'Barahona')->first()->id],
            ['name' => 'Pescadería', 'state_id' => States::where('name', 'Barahona')->first()->id],
            ['name' => 'Vicente Noble', 'state_id' => States::where('name', 'Barahona')->first()->id],

            // Dajabón
            ['name' => 'Dajabón', 'state_id' => States::where('name', 'Dajabón')->first()->id],
            ['name' => 'El Pino', 'state_id' => States::where('name', 'Dajabón')->first()->id],
            ['name' => 'Loma de Cabrera', 'state_id' => States::where('name', 'Dajabón')->first()->id],
            ['name' => 'Partido', 'state_id' => States::where('name', 'Dajabón')->first()->id],
            ['name' => 'Restauración', 'state_id' => States::where('name', 'Dajabón')->first()->id],

            // Duarte
            ['name' => 'San Francisco de Macorís', 'state_id' => States::where('name', 'Duarte')->first()->id],
            ['name' => 'Arenoso', 'state_id' => States::where('name', 'Duarte')->first()->id],
            ['name' => 'Castillo', 'state_id' => States::where('name', 'Duarte')->first()->id],
            ['name' => 'Eugenio María de Hostos', 'state_id' => States::where('name', 'Duarte')->first()->id],
            ['name' => 'Las Guáranas', 'state_id' => States::where('name', 'Duarte')->first()->id],
            ['name' => 'Pimentel', 'state_id' => States::where('name', 'Duarte')->first()->id],
            ['name' => 'San Luis', 'state_id' => States::where('name', 'Duarte')->first()->id],

            // El Seibo
            ['name' => 'El Seibo', 'state_id' => States::where('name', 'El Seibo')->first()->id],
            ['name' => 'Miches', 'state_id' => States::where('name', 'El Seibo')->first()->id],
            ['name' => 'Santa Cruz de El Seibo', 'state_id' => States::where('name', 'El Seibo')->first()->id],

            // Elías Piña
            ['name' => 'Comendador', 'state_id' => States::where('name', 'Elías Piña')->first()->id],
            ['name' => 'Bánica', 'state_id' => States::where('name', 'Elías Piña')->first()->id],
            ['name' => 'El Llano', 'state_id' => States::where('name', 'Elías Piña')->first()->id],
            ['name' => 'Hondo Valle', 'state_id' => States::where('name', 'Elías Piña')->first()->id],
            ['name' => 'Juan Santiago', 'state_id' => States::where('name', 'Elías Piña')->first()->id],

            // Espaillat
            ['name' => 'Moca', 'state_id' => States::where('name', 'Espaillat')->first()->id],
            ['name' => 'Cayetano Germosén', 'state_id' => States::where('name', 'Espaillat')->first()->id],
            ['name' => 'Gaspar Hernández', 'state_id' => States::where('name', 'Espaillat')->first()->id],
            ['name' => 'Jamao al Norte', 'state_id' => States::where('name', 'Espaillat')->first()->id],

            // Hato Mayor
            ['name' => 'Hato Mayor del Rey', 'state_id' => States::where('name', 'Hato Mayor')->first()->id],
            ['name' => 'El Valle', 'state_id' => States::where('name', 'Hato Mayor')->first()->id],
            ['name' => 'Sabana de la Mar', 'state_id' => States::where('name', 'Hato Mayor')->first()->id],
            ['name' => 'Yerba Buena', 'state_id' => States::where('name', 'Hato Mayor')->first()->id],

            // Hermanas Mirabal
            ['name' => 'Salcedo', 'state_id' => States::where('name', 'Hermanas Mirabal')->first()->id],
            ['name' => 'Tenares', 'state_id' => States::where('name', 'Hermanas Mirabal')->first()->id],
            ['name' => 'Villa Tapia', 'state_id' => States::where('name', 'Hermanas Mirabal')->first()->id],

            // Independencia
            ['name' => 'Jimaní', 'state_id' => States::where('name', 'Independencia')->first()->id],
            ['name' => 'Duvergé', 'state_id' => States::where('name', 'Independencia')->first()->id],
            ['name' => 'La Descubierta', 'state_id' => States::where('name', 'Independencia')->first()->id],
            ['name' => 'Mella', 'state_id' => States::where('name', 'Independencia')->first()->id],

            // La Altagracia
            ['name' => 'Higüey', 'state_id' => States::where('name', 'La Altagracia')->first()->id],
            ['name' => 'La Otra Banda', 'state_id' => States::where('name', 'La Altagracia')->first()->id],
            ['name' => 'Boca de Yuma', 'state_id' => States::where('name', 'La Altagracia')->first()->id],
            ['name' => 'San Rafael del Yuma', 'state_id' => States::where('name', 'La Altagracia')->first()->id],

            // La Romana
            ['name' => 'La Romana', 'state_id' => States::where('name', 'La Romana')->first()->id],
            ['name' => 'Guaymate', 'state_id' => States::where('name', 'La Romana')->first()->id],
            ['name' => 'La Caleta', 'state_id' => States::where('name', 'La Romana')->first()->id],
            ['name' => 'Villa Hermosa', 'state_id' => States::where('name', 'La Romana')->first()->id],

            // La Vega
            ['name' => 'La Vega', 'state_id' => States::where('name', 'La Vega')->first()->id],
            ['name' => 'Concepción de La Vega', 'state_id' => States::where('name', 'La Vega')->first()->id],
            ['name' => 'Jarabacoa', 'state_id' => States::where('name', 'La Vega')->first()->id],
            ['name' => 'Jima Abajo', 'state_id' => States::where('name', 'La Vega')->first()->id],

            // María Trinidad Sánchez
            ['name' => 'Nagua', 'state_id' => States::where('name', 'María Trinidad Sánchez')->first()->id],
            ['name' => 'Cabrera', 'state_id' => States::where('name', 'María Trinidad Sánchez')->first()->id],
            ['name' => 'El Factor', 'state_id' => States::where('name', 'María Trinidad Sánchez')->first()->id],
            ['name' => 'Río San Juan', 'state_id' => States::where('name', 'María Trinidad Sánchez')->first()->id],

            // Monseñor Nouel
            ['name' => 'Bonao', 'state_id' => States::where('name', 'Monseñor Nouel')->first()->id],
            ['name' => 'Maimón', 'state_id' => States::where('name', 'Monseñor Nouel')->first()->id],
            ['name' => 'Piedra Blanca', 'state_id' => States::where('name', 'Monseñor Nouel')->first()->id],
            ['name' => 'Sabana del Puerto', 'state_id' => States::where('name', 'Monseñor Nouel')->first()->id],

            // Monte Cristi
            ['name' => 'San Fernando de Monte Cristi', 'state_id' => States::where('name', 'Monte Cristi')->first()->id],
            ['name' => 'Castañuelas', 'state_id' => States::where('name', 'Monte Cristi')->first()->id],
            ['name' => 'Guayubín', 'state_id' => States::where('name', 'Monte Cristi')->first()->id],
            ['name' => 'Las Matas de Santa Cruz', 'state_id' => States::where('name', 'Monte Cristi')->first()->id],

            // Monte Plata
            ['name' => 'Monte Plata', 'state_id' => States::where('name', 'Monte Plata')->first()->id],
            ['name' => 'Bayaguana', 'state_id' => States::where('name', 'Monte Plata')->first()->id],
            ['name' => 'Peralvillo', 'state_id' => States::where('name', 'Monte Plata')->first()->id],
            ['name' => 'Yamasá', 'state_id' => States::where('name', 'Monte Plata')->first()->id],

            // Pedernales
            ['name' => 'Pedernales', 'state_id' => States::where('name', 'Pedernales')->first()->id],
            ['name' => 'Juancho', 'state_id' => States::where('name', 'Pedernales')->first()->id],
            ['name' => 'José Francisco Peña Gómez', 'state_id' => States::where('name', 'Pedernales')->first()->id],

            // Peravia
            ['name' => 'Baní', 'state_id' => States::where('name', 'Peravia')->first()->id],
            ['name' => 'Nizao', 'state_id' => States::where('name', 'Peravia')->first()->id],
            ['name' => 'Matanzas', 'state_id' => States::where('name', 'Peravia')->first()->id],
            ['name' => 'Sabana Grande de Palenque', 'state_id' => States::where('name', 'Peravia')->first()->id],

            // Puerto Plata
            ['name' => 'Puerto Plata', 'state_id' => States::where('name', 'Puerto Plata')->first()->id],
            ['name' => 'Altamira', 'state_id' => States::where('name', 'Puerto Plata')->first()->id],
            ['name' => 'Guananico', 'state_id' => States::where('name', 'Puerto Plata')->first()->id],
            ['name' => 'Imbert', 'state_id' => States::where('name', 'Puerto Plata')->first()->id],

            // Sánchez Ramírez
            ['name' => 'Cotuí', 'state_id' => States::where('name', 'Sánchez Ramírez')->first()->id],
            ['name' => 'Cevicos', 'state_id' => States::where('name', 'Sánchez Ramírez')->first()->id],
            ['name' => 'La Mata', 'state_id' => States::where('name', 'Sánchez Ramírez')->first()->id],
            ['name' => 'Fantino', 'state_id' => States::where('name', 'Sánchez Ramírez')->first()->id],

            // San Cristóbal
            ['name' => 'San Cristóbal', 'state_id' => States::where('name', 'San Cristóbal')->first()->id],
            ['name' => 'Bajos de Haina', 'state_id' => States::where('name', 'San Cristóbal')->first()->id],
            ['name' => 'San Gregorio de Nigua', 'state_id' => States::where('name', 'San Cristóbal')->first()->id],
            ['name' => 'Yaguate', 'state_id' => States::where('name', 'San Cristóbal')->first()->id],

            // San José de Ocoa
            ['name' => 'San José de Ocoa', 'state_id' => States::where('name', 'San José de Ocoa')->first()->id],
            ['name' => 'Rancho Arriba', 'state_id' => States::where('name', 'San José de Ocoa')->first()->id],
            ['name' => 'Sabana Larga', 'state_id' => States::where('name', 'San José de Ocoa')->first()->id],

            // San Juan
            ['name' => 'San Juan de la Maguana', 'state_id' => States::where('name', 'San Juan')->first()->id],
            ['name' => 'El Cercado', 'state_id' => States::where('name', 'San Juan')->first()->id],
            ['name' => 'Juan de Herrera', 'state_id' => States::where('name', 'San Juan')->first()->id],
            ['name' => 'Las Matas de Farfán', 'state_id' => States::where('name', 'San Juan')->first()->id],

            // San Pedro de Macorís
            ['name' => 'San Pedro de Macorís', 'state_id' => States::where('name', 'San Pedro de Macorís')->first()->id],
            ['name' => 'Consuelo', 'state_id' => States::where('name', 'San Pedro de Macorís')->first()->id],
            ['name' => 'Guayabo', 'state_id' => States::where('name', 'San Pedro de Macorís')->first()->id],
            ['name' => 'Quisqueya', 'state_id' => States::where('name', 'San Pedro de Macorís')->first()->id],

            // Santiago
            ['name' => 'Santiago de los Caballeros', 'state_id' => States::where('name', 'Santiago')->first()->id],
            ['name' => 'Bisonó', 'state_id' => States::where('name', 'Santiago')->first()->id],
            ['name' => 'Jánico', 'state_id' => States::where('name', 'Santiago')->first()->id],
            ['name' => 'San José de las Matas', 'state_id' => States::where('name', 'Santiago')->first()->id],

            // Santiago Rodríguez
            ['name' => 'San Ignacio de Sabaneta', 'state_id' => States::where('name', 'Santiago Rodríguez')->first()->id],
            ['name' => 'Monción', 'state_id' => States::where('name', 'Santiago Rodríguez')->first()->id],
            ['name' => 'Villa Los Almácigos', 'state_id' => States::where('name', 'Santiago Rodríguez')->first()->id],

            // Santo Domingo
            ['name' => 'Santo Domingo Este', 'state_id' => States::where('name', 'Santo Domingo')->first()->id],
            ['name' => 'Santo Domingo Norte', 'state_id' => States::where('name', 'Santo Domingo')->first()->id],
            ['name' => 'Santo Domingo Oeste', 'state_id' => States::where('name', 'Santo Domingo')->first()->id],
            ['name' => 'Boca Chica', 'state_id' => States::where('name', 'Santo Domingo')->first()->id],

            // Valverde
            ['name' => 'Mao', 'state_id' => States::where('name', 'Valverde')->first()->id],
            ['name' => 'Esperanza', 'state_id' => States::where('name', 'Valverde')->first()->id],
            ['name' => 'Laguna Salada', 'state_id' => States::where('name', 'Valverde')->first()->id],
        ];

        foreach ($ciudades as $ciudad) {
            Cities::create($ciudad);
        }
    }
}
