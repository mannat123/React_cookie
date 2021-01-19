<?php

namespace App\Http\Controllers;
// use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Cookie;
use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    protected function respondWithToken($token)
    {
        $res= new Response();
    
        $res->withCookie(new cookie('token',$token,45000));
        echo $res;
        return $res;
    }
}
