<?php

namespace App\Http\Controllers;

use App\Models\CustomerInfo;
use App\Models\DeliveryType;
use App\Models\Order;
use App\Models\PaymentType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class ShoppingCartPaymentController extends Controller
{
    public function index()
    {
        if (!Session::get('orderId'))
            return redirect('shoppingCart');

        $order = ShoppingCartController::makeOrder();
        $paymentTypes = PaymentType::all();
        return view('shoppingCartPayment', ['previousPage' => str_replace(url('/'), '', url()->previous())])
            ->with('order', $order)
            ->with('paymentTypes', $paymentTypes);
    }

    public function store(Request $request)
    {
        if (!Session::get('orderId'))
            return redirect('shoppingCart');

        $order = ShoppingCartController::makeOrder();

        $order->payment_type_id = $request->paymentType;
        $order->state = 'paid';
        $order->save();

        return view('shoppingCartAllPaid')->with('order', $order);
    }
}
