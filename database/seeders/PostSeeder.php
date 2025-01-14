<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('posts')->insert([
            'name' => 'Lorem Ipsum',
            'slug' => 'lorem-ipsum',
            'content' => '
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id turpis at lorem imperdiet iaculis vitae eu ante. Sed porta, nisl in venenatis ornare, mi enim iaculis eros, nec elementum lacus neque quis lectus. Ut laoreet pellentesque tellus, vel fringilla enim ornare in. Donec tincidunt dignissim massa eget cursus. Morbi nunc tellus, malesuada non tristique eu, interdum et purus. Nullam lacinia ante id varius luctus. In euismod nunc elit, id convallis leo fringilla non. Nunc auctor nisl massa, a aliquet turpis sollicitudin vel. Aliquam nec dignissim elit, at gravida dolor. Aenean venenatis fermentum neque vel accumsan. Quisque egestas ornare efficitur. Mauris sodales dignissim tincidunt. Ut feugiat eros et commodo aliquam. Vestibulum et tincidunt elit, vitae egestas purus.
<br>
Etiam lobortis hendrerit nisi eget sollicitudin. Aliquam a lectus sed libero consequat vulputate a sit amet ipsum. Cras egestas, libero et molestie vestibulum, arcu nisi dictum est, non rhoncus magna ligula nec neque. Nullam semper lectus sed tellus blandit pellentesque. Sed imperdiet augue et dui pellentesque, vel tincidunt ligula egestas. Nunc nec est sit amet sapien vehicula convallis. Ut sed hendrerit tellus. Donec dapibus mi sapien, vitae sodales orci vehicula non.
<br>
Integer in mattis nulla, et blandit lacus. Integer dictum, orci iaculis feugiat dictum, dolor justo lobortis elit, quis volutpat sem neque non dui. Donec velit enim, cursus non arcu nec, vehicula blandit neque. Praesent cursus aliquam tellus, vitae venenatis mi dignissim eget. Fusce in mollis turpis. Maecenas eu orci mollis, pulvinar nunc ac, accumsan massa. Duis efficitur diam at risus ultricies, in vestibulum erat efficitur. <br> Duis quis congue arcu, eget iaculis orci. Nulla sollicitudin imperdiet semper. Aliquam tincidunt auctor finibus. Nulla eu accumsan nibh. Pellentesque lectus augue, tristique non aliquam ac, porttitor non orci. Nullam augue elit, pulvinar eu enim sed, vulputate porta augue. Cras molestie, dolor vel vulputate efficitur, justo tortor finibus nisi, ornare sollicitudin eros risus et metus. <br> Aenean sit amet scelerisque enim. Vivamus auctor tempor ante et egestas. Etiam ut malesuada mi, eu auctor nibh. Vivamus elementum, ex ut facilisis feugiat, est nisl mollis nisl, id dignissim metus quam a nisi. Quisque quis erat vehicula, tempor orci eu, pretium quam. Morbi in elit tincidunt, aliquet arcu sed, euismod libero. Quisque non ipsum lectus. Pellentesque et erat maximus, lacinia augue at, placerat eros. Aenean ac rutrum est, et tristique ante. In ut lobortis quam, eu venenatis purus. Etiam mattis vel erat at venenatis. Mauris vitae sem in justo feugiat laoreet. Ut gravida elit eu sem hendrerit porta.
            ',
            'extract' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            'status' => 1, // Cambia esto según el estado que desees
            'image' => asset('img/posts/default.jpg'), // Ruta completa
            'category_post_id' => 1, // ID de la categoría
            'user_id' => 1, // ID del usuario
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('posts')->insert([
            'name' => 'Lorem Ipsum',
            'slug' => 'lorem-ipsum2',
            'content' => '
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id turpis at lorem imperdiet iaculis vitae eu ante. Sed porta, nisl in venenatis ornare, mi enim iaculis eros, nec elementum lacus neque quis lectus. Ut laoreet pellentesque tellus, vel fringilla enim ornare in. Donec tincidunt dignissim massa eget cursus. Morbi nunc tellus, malesuada non tristique eu, interdum et purus. Nullam lacinia ante id varius luctus. In euismod nunc elit, id convallis leo fringilla non. Nunc auctor nisl massa, a aliquet turpis sollicitudin vel. Aliquam nec dignissim elit, at gravida dolor. Aenean venenatis fermentum neque vel accumsan. Quisque egestas ornare efficitur. Mauris sodales dignissim tincidunt. Ut feugiat eros et commodo aliquam. Vestibulum et tincidunt elit, vitae egestas purus.
<br>
Etiam lobortis hendrerit nisi eget sollicitudin. Aliquam a lectus sed libero consequat vulputate a sit amet ipsum. Cras egestas, libero et molestie vestibulum, arcu nisi dictum est, non rhoncus magna ligula nec neque. Nullam semper lectus sed tellus blandit pellentesque. Sed imperdiet augue et dui pellentesque, vel tincidunt ligula egestas. Nunc nec est sit amet sapien vehicula convallis. Ut sed hendrerit tellus. Donec dapibus mi sapien, vitae sodales orci vehicula non.
<br>
Integer in mattis nulla, et blandit lacus. Integer dictum, orci iaculis feugiat dictum, dolor justo lobortis elit, quis volutpat sem neque non dui. Donec velit enim, cursus non arcu nec, vehicula blandit neque. Praesent cursus aliquam tellus, vitae venenatis mi dignissim eget. Fusce in mollis turpis. Maecenas eu orci mollis, pulvinar nunc ac, accumsan massa. Duis efficitur diam at risus ultricies, in vestibulum erat efficitur. <br> Duis quis congue arcu, eget iaculis orci. Nulla sollicitudin imperdiet semper. Aliquam tincidunt auctor finibus. Nulla eu accumsan nibh. Pellentesque lectus augue, tristique non aliquam ac, porttitor non orci. Nullam augue elit, pulvinar eu enim sed, vulputate porta augue. Cras molestie, dolor vel vulputate efficitur, justo tortor finibus nisi, ornare sollicitudin eros risus et metus. <br> Aenean sit amet scelerisque enim. Vivamus auctor tempor ante et egestas. Etiam ut malesuada mi, eu auctor nibh. Vivamus elementum, ex ut facilisis feugiat, est nisl mollis nisl, id dignissim metus quam a nisi. Quisque quis erat vehicula, tempor orci eu, pretium quam. Morbi in elit tincidunt, aliquet arcu sed, euismod libero. Quisque non ipsum lectus. Pellentesque et erat maximus, lacinia augue at, placerat eros. Aenean ac rutrum est, et tristique ante. In ut lobortis quam, eu venenatis purus. Etiam mattis vel erat at venenatis. Mauris vitae sem in justo feugiat laoreet. Ut gravida elit eu sem hendrerit porta.
            ',
            'extract' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            'status' => 1, // Cambia esto según el estado que desees
            'image' => asset('img/posts/default.jpg'), // Ruta completa
            'category_post_id' => 1, // ID de la categoría
            'user_id' => 1, // ID del usuario
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('posts')->insert([
            'name' => 'Lorem Ipsum',
            'slug' => 'lorem-ipsum3',
            'content' => '
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id turpis at lorem imperdiet iaculis vitae eu ante. Sed porta, nisl in venenatis ornare, mi enim iaculis eros, nec elementum lacus neque quis lectus. Ut laoreet pellentesque tellus, vel fringilla enim ornare in. Donec tincidunt dignissim massa eget cursus. Morbi nunc tellus, malesuada non tristique eu, interdum et purus. Nullam lacinia ante id varius luctus. In euismod nunc elit, id convallis leo fringilla non. Nunc auctor nisl massa, a aliquet turpis sollicitudin vel. Aliquam nec dignissim elit, at gravida dolor. Aenean venenatis fermentum neque vel accumsan. Quisque egestas ornare efficitur. Mauris sodales dignissim tincidunt. Ut feugiat eros et commodo aliquam. Vestibulum et tincidunt elit, vitae egestas purus.
<br>
Etiam lobortis hendrerit nisi eget sollicitudin. Aliquam a lectus sed libero consequat vulputate a sit amet ipsum. Cras egestas, libero et molestie vestibulum, arcu nisi dictum est, non rhoncus magna ligula nec neque. Nullam semper lectus sed tellus blandit pellentesque. Sed imperdiet augue et dui pellentesque, vel tincidunt ligula egestas. Nunc nec est sit amet sapien vehicula convallis. Ut sed hendrerit tellus. Donec dapibus mi sapien, vitae sodales orci vehicula non.
<br>
Integer in mattis nulla, et blandit lacus. Integer dictum, orci iaculis feugiat dictum, dolor justo lobortis elit, quis volutpat sem neque non dui. Donec velit enim, cursus non arcu nec, vehicula blandit neque. Praesent cursus aliquam tellus, vitae venenatis mi dignissim eget. Fusce in mollis turpis. Maecenas eu orci mollis, pulvinar nunc ac, accumsan massa. Duis efficitur diam at risus ultricies, in vestibulum erat efficitur. <br> Duis quis congue arcu, eget iaculis orci. Nulla sollicitudin imperdiet semper. Aliquam tincidunt auctor finibus. Nulla eu accumsan nibh. Pellentesque lectus augue, tristique non aliquam ac, porttitor non orci. Nullam augue elit, pulvinar eu enim sed, vulputate porta augue. Cras molestie, dolor vel vulputate efficitur, justo tortor finibus nisi, ornare sollicitudin eros risus et metus. <br> Aenean sit amet scelerisque enim. Vivamus auctor tempor ante et egestas. Etiam ut malesuada mi, eu auctor nibh. Vivamus elementum, ex ut facilisis feugiat, est nisl mollis nisl, id dignissim metus quam a nisi. Quisque quis erat vehicula, tempor orci eu, pretium quam. Morbi in elit tincidunt, aliquet arcu sed, euismod libero. Quisque non ipsum lectus. Pellentesque et erat maximus, lacinia augue at, placerat eros. Aenean ac rutrum est, et tristique ante. In ut lobortis quam, eu venenatis purus. Etiam mattis vel erat at venenatis. Mauris vitae sem in justo feugiat laoreet. Ut gravida elit eu sem hendrerit porta.
            ',
            'extract' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            'status' => 1, // Cambia esto según el estado que desees
            'image' => asset('img/posts/default.jpg'), // Ruta completa
            'category_post_id' => 1, // ID de la categoría
            'user_id' => 1, // ID del usuario
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
