<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware

{

    public function handle($request, Closure $next)

    {

        $headers = [

            
            'Access-Control-Allow-Origin' => 'http://127.0.0.1:8080',

            'Access-Control-Allow-Methods' => 'POST, GET, OPTIONS, PUT, DELETE',

            'Access-Control-Allow-Credentials' => 'true',

            'Access-Control-Max-Age' => '86400',

            'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With, token',

        ];


        if ($request->isMethod('OPTIONS')) {

            return response()->json('{"method":"OPTIONS"}', 200, $headers);

        }

        $response = $next($request);

        foreach ($headers as $key => $value) {

            $response->header($key, $value);

        }

        return $response;

    }

}