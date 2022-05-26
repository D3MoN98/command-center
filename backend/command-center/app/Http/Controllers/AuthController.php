<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'), $request->remember_me)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid login details'
            ], 422);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'data' => [
                'user' => $user,
                'auth_token' => $token,
                'token_type' => 'Bearer',
            ]
        ]);
    }

    public function logout()
    {
        $user = Auth::user();
        $user->tokens()->delete();
        Auth::guard('web')->logout();

        return response()->json([
            'status' => 'success',
            'message' => 'Logout successfull',
        ]);
    }

    public function forgetPassword(Request $request)
    {
        try {
            $request->validate(['email' => 'required|email']);

            $status = Password::sendResetLink(
                $request->only('email')
            );

            return $status === Password::RESET_LINK_SENT
                ? response()->json(['status' => 'success', 'message' => __($status)])
                : response()->json(['status' => 'error', 'message' => __($status)], 422);
        } catch (Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function ResetPassword(Request $request)
    {
        try {
            $request->validate([
                'token' => 'required',
                'email' => 'required|email',
                'password' => 'required|min:6|confirmed',
            ]);

            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function ($user, $password) {
                    $user->forceFill([
                        'password' => Hash::make($password)
                    ])->setRememberToken(Str::random(60));

                    $user->save();

                    event(new PasswordReset($user));
                }
            );

            return $status === Password::PASSWORD_RESET
                ? response()->json(['status' => 'success', 'message' => __($status)])
                : response()->json(['status' => 'error', 'message' => __($status)], 422);
        } catch (Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function googleLoginAction()
    {
        try {
            $url = Socialite::driver('google')->stateless()->redirect()->getTargetUrl();

            return response()->json(['status' => 'success', 'messsage' => 'Working..', 'url' => $url]);
        } catch (Exception $e) {
            return response()->json(['status' => 'error', 'messsage' => $e->getMessage()], 500);
        }
    }

    public function googleLoginCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            $user = User::updateOrCreate(
                ['email' => $googleUser['email']],
                [
                    'email' =>  $googleUser->email,
                    'name' =>  $googleUser->name,
                    'password' =>  Hash::make($googleUser->id),
                    'avatar' =>  $googleUser->avatar,
                    'google_id' =>  $googleUser->id,
                    'status' => true
                ]
            );

            Auth::login($user);
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'data' => [
                    'user' => $user,
                    'auth_token' => $token,
                    'token_type' => 'Bearer',
                ]
            ]);

            return response()->json(['status' => 'success', 'message' => 'Login successfull', 'data' => $user]);
        } catch (Exception $e) {
            return response()->json(['status' => 'error', 'messsage' => $e->getMessage()], 500);
        }
    }

    public function profileUpdate(Request $request)
    {
        try {
            $id = Auth::id();
            $user = Auth::user();

            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($user->id)],
                'contact_no' => ['required', Rule::unique('users', 'contact_no')->ignore($user->id)],
            ], [
                'name.required' => 'Name field is required.',
                'email.required' => 'Email field is required.',
                'email.email' => 'Please proide an valid email address.',
                'contact_no.required' => 'Contact No field is required.',
            ]);


            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            User::findOrFail($user->id)->update($request->all());

            return response()->json(['status' => 'success', 'message' => 'Profile updated successfully', 'data' => new UserResource($user->refresh())]);
        } catch (Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }
}