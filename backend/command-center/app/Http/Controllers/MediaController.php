<?php

namespace App\Http\Controllers;

use App\Http\Resources\MediaResource;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $file = $request->file('files');

            $name = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $path = $file->store('media', 'public');

            $media = Media::create([
                'user_id' => Auth::id(),
                'name' => "$name.$extension",
                'url' => $path
            ]);

            return response()->json(['status' => 'success', 'message' => "Media uploaded successfully", 'data' => new MediaResource($media)]);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
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
        //
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

    public function getMediaByUser()
    {
        try {
            return MediaResource::collection(Auth::user()->medias()->orderBy('created_at', 'DESC')->paginate(6));
            // return response()->json(['status' => 'success', 'message' => "Media fetched successfully", 'data' => MediaResource::collection(Auth::user()->medias()->orderBy('created_at', 'DESC')->paginate(2))]);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}