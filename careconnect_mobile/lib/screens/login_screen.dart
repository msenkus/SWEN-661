import 'dart:async';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();

  String email = '';
  String password = '';
  bool showPassword = false;
  bool rememberMe = false;
  bool loading = false;

  void handleLogin() {
    if (!_formKey.currentState!.validate()) return;

    setState(() => loading = true);

    // Simulate login delay
    Timer(const Duration(milliseconds: 1500), () {
      setState(() => loading = false);
      context.go('/dashboard');
    });
  }

  @override
  Widget build(BuildContext context) {
    final isTablet = MediaQuery.of(context).size.width >= 700;

    return Scaffold(
      backgroundColor: Colors.blue.shade50,
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Container(
            constraints: const BoxConstraints(maxWidth: 420),
            padding: EdgeInsets.all(isTablet ? 32 : 24),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              boxShadow: const [
                BoxShadow(
                  blurRadius: 24,
                  color: Colors.black12,
                ),
              ],
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                _logoHeader(),
                const SizedBox(height: 32),
                _loginForm(),
                const SizedBox(height: 24),
                _signupPrompt(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  // ---------------- HEADER ----------------

  Widget _logoHeader() {
    return Column(
      children: [
        Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
            color: Colors.blue,
            borderRadius: BorderRadius.circular(20),
          ),
          child: const Icon(
            Icons.favorite,
            color: Colors.white,
            size: 40,
          ),
        ),
        const SizedBox(height: 16),
        const Text(
          'CareConnect',
          style: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        const Text(
          'Manage your health journey with ease',
          textAlign: TextAlign.center,
          style: TextStyle(color: Colors.grey),
        ),
      ],
    );
  }

  // ---------------- FORM ----------------

  Widget _loginForm() {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          // EMAIL
          TextFormField(
            key: const Key('login_email'),
            decoration: _inputDecoration(
              label: 'Email Address',
              hint: 'name@example.com',
            ),
            keyboardType: TextInputType.emailAddress,
            onChanged: (v) => email = v,
            validator: (v) =>
                v == null || !v.contains('@') ? 'Enter a valid email' : null,
          ),

          const SizedBox(height: 20),

          // PASSWORD
          TextFormField(
            key: const Key('login_password'),
            decoration: _inputDecoration(
              label: 'Password',
              hint: 'Enter your password',
              suffix: IconButton(
                icon: Icon(
                  showPassword
                      ? Icons.visibility_off
                      : Icons.visibility,
                ),
                onPressed: () =>
                    setState(() => showPassword = !showPassword),
              ),
            ),
            obscureText: !showPassword,
            onChanged: (v) => password = v,
            validator: (v) =>
                v == null || v.length < 6
                    ? 'Password must be at least 6 characters'
                    : null,
          ),

          const SizedBox(height: 16),

          // REMEMBER + FORGOT
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Checkbox(
                    key: const Key('remember_me_checkbox'),
                    value: rememberMe,
                    onChanged: (v) =>
                        setState(() => rememberMe = v ?? false),
                  ),
                  const Text('Remember me'),
                ],
              ),
              TextButton(
                onPressed: () {},
                child: const Text('Forgot Password?'),
              ),
            ],
          ),

          const SizedBox(height: 20),

          // SUBMIT
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              key: const Key('login_submit'),
              onPressed: loading ? null : handleLogin,
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 18),
                backgroundColor: Colors.blue,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              child: loading
                  ? const SizedBox(
                      height: 24,
                      width: 24,
                      child: CircularProgressIndicator(
                        strokeWidth: 3,
                        color: Colors.white,
                      ),
                    )
                  : Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        Text(
                          'Sign In',
                          style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold),
                        ),
                        SizedBox(width: 8),
                        Icon(Icons.login),
                      ],
                    ),
            ),
          ),
        ],
      ),
    );
  }

  // ---------------- FOOTER ----------------

  Widget _signupPrompt() {
    return Column(
      children: [
        const Divider(),
        const SizedBox(height: 12),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text("Don't have an account? "),
            GestureDetector(
              onTap: () {},
              child: const Text(
                'Sign up for CareConnect',
                style: TextStyle(
                  color: Colors.blue,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  // ---------------- HELPERS ----------------

  InputDecoration _inputDecoration({
    required String label,
    required String hint,
    Widget? suffix,
  }) {
    return InputDecoration(
      labelText: label,
      hintText: hint,
      suffixIcon: suffix,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
      ),
    );
  }
}
