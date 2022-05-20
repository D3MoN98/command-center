<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('permission:user.list')->only('index');
        $this->middleware('permission:user.create')->only('create');
        $this->middleware('permission:user.view')->only('view');
        $this->middleware('permission:user.edit')->only('edit');
        $this->middleware('permission:user.delete')->only('destroy');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = User::where('deleted_at', null);
        if (isset($request->sort_by) && count(json_decode($request->sort_by)) > 0) {
            $sort_bys = json_decode($request->sort_by);
            if (count($sort_bys)) {
                foreach ($sort_bys as $key) {
                    $user->orderBy($key->id, $key->desc ? 'DESC' : 'ASC');
                }
            }
        }

        if (isset($request->keyword) && !empty($request->keyword)) {
            $user->where('email', 'like', "%$request->keyword%");
            $user->orWhere('name', 'like', "%$request->keyword%");
            $user->orWhere('contact_no', 'like', "%$request->keyword%");
        }

        return UserResource::collection($user->paginate($request->per_page));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $user = User::find($id)->update($request->all());
            return response()->json(['status' => 'successful', 'message' => 'User updated']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}