<?php

namespace App\Http\Controllers;

use App\Models\CustomerInfo;
use App\Models\DeliveryType;
use App\Models\Order;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class ShoppingCartDeliveryController extends Controller
{
    public function index()
    {
        if (!Session::get('orderId'))
            return redirect('shoppingCart');

        $order = ShoppingCartController::makeOrder();
        $deliveryTypes = DeliveryType::all();
        return view('shoppingCartDelivery', ['previousPage' => str_replace(url('/'), '', url()->previous())])
            ->with('order', $order)
            ->with('deliveryTypes', $deliveryTypes)
            ->with('user', Auth::user());
    }

    public function store(Request $request): \Illuminate\Routing\Redirector|\Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse
    {
        if (!Session::get('orderId'))
            return redirect('shoppingCart');

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'street' => ['required', 'string', 'max:255'],
            'postalCode' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
        ]);


        $order = ShoppingCartController::makeOrder();

        if (CustomerInfo::where('order_id', $order->id)->first() == null) {
            $info = CustomerInfo::create([
                'name' => $request->name,
                'order_id' => $order->id,
                'street' => $request->street,
                'postalCode' => $request->postalCode,
                'city' => $request->city,
                'phone' => $request->phone,
                'email' => $request->email,
            ]);
            $info->save();
        }


        $order->delivery_type_id = $request->deliveryType;
        $order->save();

        return redirect('shoppingCartPayment');
    }
}
