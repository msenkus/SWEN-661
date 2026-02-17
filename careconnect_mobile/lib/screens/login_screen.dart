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
  final FocusNode _passwordFocusNode = FocusNode();

  String email = '';
  String password = '';
  bool showPassword = false;
  bool rememberMe = false;
  bool loading = false;

  @override
  void dispose() {
    _passwordFocusNode.dispose();
    super.dispose();
  }

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
    return Semantics(
      header: true,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Semantics(
            label: 'CareConnect logo',
            image: true,
            child: Container(
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
          ),
          const SizedBox(height: 16),
          Center(
            child: FittedBox(
              fit: BoxFit.scaleDown,
              child: const Text(
                'CareConnect',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            'Manage your health journey with ease',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.grey),
          ),
        ],
      ),
    );
  }

  // ---------------- FORM ----------------

  Widget _loginForm() {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          // EMAIL
          Semantics(
            label: 'Email Address',
            identifier: 'login_email',
            explicitChildNodes: true,
            child: TextFormField(
              key: const Key('login_email'),
              decoration: _inputDecoration(
                label: 'Email Address',
                hint: 'name@example.com',
              ),
              keyboardType: TextInputType.emailAddress,
              textInputAction: TextInputAction.next,
              onChanged: (v) => email = v,
              onFieldSubmitted: (_) => _passwordFocusNode.requestFocus(),
              validator: (v) =>
                  v == null || !v.contains('@') ? 'Enter a valid email' : null,
            ),
          ),

          const SizedBox(height: 20),

          // PASSWORD
          Semantics(
            label: 'Password',
            identifier: 'login_password',
            explicitChildNodes: true,
            child: TextFormField(
              key: const Key('login_password'),
              focusNode: _passwordFocusNode,
              decoration: _inputDecoration(
                label: 'Password',
                hint: 'Enter your password',
                suffix: MergeSemantics(
                  child: Semantics(
                    label: showPassword
                        ? 'Hide password'
                        : 'Show password',
                    button: true,
                    child: IconButton(
                    icon: Icon(
                      showPassword
                          ? Icons.visibility_off
                          : Icons.visibility,
                    ),
                    onPressed: () =>
                        setState(() => showPassword = !showPassword),
                    ),
                  ),
                ),
              ),
              obscureText: !showPassword,
              textInputAction: TextInputAction.done,
              onChanged: (v) => password = v,
              onFieldSubmitted: (_) => handleLogin(),
              validator: (v) =>
                  v == null || v.length < 6
                      ? 'Password must be at least 6 characters'
                      : null,
            ),
          ),

          const SizedBox(height: 16),

          // REMEMBER + FORGOT
          Wrap(
            spacing: 8,
            runSpacing: 8,
            alignment: WrapAlignment.spaceBetween,
            children: [
              MergeSemantics(
                child: Semantics(
                  label: 'Remember me, checkbox, ${rememberMe ? "checked" : "unchecked"}',
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(minHeight: 48),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Checkbox(
                          key: const Key('remember_me_checkbox'),
                          value: rememberMe,
                          onChanged: (v) =>
                              setState(() => rememberMe = v ?? false),
                        ),
                        GestureDetector(
                          onTap: () =>
                              setState(() => rememberMe = !rememberMe),
                          child: const Padding(
                            padding: EdgeInsets.symmetric(vertical: 12),
                            child: Align(
                              alignment: Alignment.centerLeft,
                              child: Text('Remember me'),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              Semantics(
                label: 'Forgot Password, button',
                button: true,
                child: TextButton(
                  onPressed: () {},
                  child: const Text('Forgot Password?'),
                ),
              ),
            ],
          ),

          const SizedBox(height: 20),

          // SUBMIT
          Semantics(
            label: loading ? 'Signing in' : 'Sign In, button',
            identifier: 'login_submit',
            explicitChildNodes: true,
            button: true,
            child: SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                key: const Key('login_submit'),
                onPressed: loading ? null : handleLogin,
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 18),
                  backgroundColor: Colors.blue,
                  minimumSize: const Size.fromHeight(48), // WCAG 2.1: Minimum touch target
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
        Wrap(
          alignment: WrapAlignment.center,
          crossAxisAlignment: WrapCrossAlignment.center,
          children: [
            const Text("Don't have an account? "),
            Semantics(
              label: 'Sign up for CareConnect, button',
              button: true,
              child: InkWell(
                onTap: () {},
                borderRadius: BorderRadius.circular(8),
                child: Container(
                  constraints: const BoxConstraints(minWidth: 48, minHeight: 48),
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                  alignment: Alignment.center,
                  child: const Text(
                    'Sign up for CareConnect',
                    style: TextStyle(
                      color: Colors.blue,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
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
      // WCAG 2.1: Ensure minimum 48px height for touch targets
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
    );
  }
}
