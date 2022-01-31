<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\ProductGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Session;

class ShoppingCartController extends Controller
{

    public static function getOrder()
    {
        $order = null;
        if (Session::get('orderId')) {
            $orderId = Session::get('orderId');
            $order = Order::where([['id', $orderId], ['state', 'creating']])->first();
        }


        if (Auth::user()) {
            $user = Auth::user();
            $order = Order::where([['user_id', $user->id], ['state', 'creating']])->first();
        }

        return $order;
    }

    public static function makeOrder()
    {
        $order = self::getOrder();

        if ($order == null) {
            $order = Order::create([
                'state' => 'creating',
            ]);
            if (Auth::user()) {
                $order->user_id = Auth::user()->id;
            }
            $order->save();
        }

        if ($order)
            Session::put('orderId', $order->id);
        return $order;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function index()
    {
        $order = self::getOrder();
        return view('shoppingCart', ['previousPage' => str_replace(url('/'), '', url()->previous())])->with('order', $order)->with('imagePath', Config::get('app.productImage'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => ['required', 'integer', 'min:0'],
        ]);

        $product = Product::where('id', $id)->first();
        if ($product == null)
            return redirect('shoppingCart');

        $order = self::makeOrder();

        $productGroup = ProductGroup::where([
            ['product_id', '=', $product->id],
            ['order_id', '=', $order->id],
        ])->first();

        if ($productGroup == null) {
            $productGroup = ProductGroup::create([
               'order_id' => $order->id,
               'product_id' => $product->id,
               'quantity' => $request->quantity,
            ]);

            $productGroup->save();
        } else {
            $productGroup->quantity = $request->quantity;
            $productGroup->save();
        }

        return redirect('shoppingCart');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function destroy($id)
    {
        $product = Product::where('id', $id)->first();

        if ($product == null)
            return redirect('shoppingCart');

        $order = self::makeOrder();
        $productGroup = ProductGroup::where([
            ['product_id', '=', $product->id],
            ['order_id', '=', $order->id],
        ])->first();
        if ($productGroup != null) {
            $productGroup->delete();
        }
        $productGroups = ProductGroup::where([
            ['order_id', '=', $order->id],
        ])->get();
        if (count($productGroups) == 0) {
            $order->delete();
            Session::remove('orderId');
        }

        return redirect('shoppingCart');
    }
}
