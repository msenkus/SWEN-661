import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../widgets/bottom_navigation_bar.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            if (context.canPop()) {
              context.pop();
            } else {
              context.go('/dashboard');
            }
          },
          tooltip: 'Back',
        ),
        title: Semantics(
          label: 'Profile',
          child: const Text('Profile'),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Profile Header
          Semantics(
            label: 'Profile information',
            child: Card(
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Row(
                  children: [
                    const CircleAvatar(
                      radius: 40,
                      backgroundColor: Colors.blue,
                      child: Icon(
                        Icons.person,
                        size: 40,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(width: 16),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Finn Jackson',
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 4),
                          Text(
                            'Patient',
                            style: TextStyle(
                              color: Colors.grey,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),

          const SizedBox(height: 24),

          // Personal Information
          _sectionHeader(context, 'Personal Information'),
          const SizedBox(height: 12),
          Card(
            child: Column(
              children: [
                _infoRow(
                  context,
                  label: 'Age',
                  value: '36 years',
                  onTap: () {},
                ),
                const Divider(height: 1),
                _infoRow(
                  context,
                  label: 'Email',
                  value: 'finn.jackson@email.com',
                  onTap: () {},
                ),
                const Divider(height: 1),
                _infoRow(
                  context,
                  label: 'Phone',
                  value: '(555) 123-4567',
                  onTap: () {},
                ),
                const Divider(height: 1),
                _infoRow(
                  context,
                  label: 'Address',
                  value: '3024 Elmer Street',
                  valueSecondary: 'Springfield, IL 62701',
                  onTap: () {},
                ),
              ],
            ),
          ),

          const SizedBox(height: 24),

          // Medical Information
          _sectionHeader(context, 'Medical Information'),
          const SizedBox(height: 12),
          Card(
            child: Column(
              children: [
                _infoRow(
                  context,
                  label: 'Conditions',
                  value: 'Diabetes, Hypertension',
                  onTap: () {},
                ),
                const Divider(height: 1),
                _infoRow(
                  context,
                  label: 'Allergies',
                  value: 'Penicillin, Shellfish',
                  onTap: () {},
                ),
                const Divider(height: 1),
                _infoRow(
                  context,
                  label: 'Primary Care Provider',
                  value: 'Dr. Sarah Johnson',
                  onTap: () {},
                ),
                const Divider(height: 1),
                _infoRow(
                  context,
                  label: 'Emergency Contact',
                  value: 'Mary Smith (Daughter)',
                  valueSecondary: '(555) 987-6543',
                  onTap: () {},
                ),
              ],
            ),
          ),

          const SizedBox(height: 24),

          // Account Settings
          _sectionHeader(context, 'Account Settings'),
          const SizedBox(height: 12),

          Semantics(
            label: 'Preferences and Accessibility, button',
            button: true,
            child: Card(
              child: ListTile(
                leading: const Icon(Icons.settings, color: Colors.blue),
                title: Semantics(
                  label: 'Preferences & Accessibility',
                  child: const Text('Preferences & Accessibility'),
                ),
                trailing: const Icon(Icons.chevron_right),
                onTap: () => context.push('/accessibility'),
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 12,
                ),
              ),
            ),
          ),

          const SizedBox(height: 8),

          Semantics(
            label: 'Notification Settings, button',
            button: true,
            child: Card(
              child: ListTile(
                leading: const Icon(Icons.notifications_outlined, color: Colors.purple),
                title: const Text('Notification Settings'),
                trailing: const Icon(Icons.chevron_right),
                onTap: () {},
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 12,
                ),
              ),
            ),
          ),

          const SizedBox(height: 8),

          Semantics(
            label: 'Connected Caregivers, button',
            button: true,
            child: Card(
              child: ListTile(
                leading: const Icon(Icons.people_outline, color: Colors.green),
                title: const Text('Connected Caregivers'),
                trailing: const Icon(Icons.chevron_right),
                onTap: () {},
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 12,
                ),
              ),
            ),
          ),

          const SizedBox(height: 24),

          Semantics(
            label: 'Sign Out, button',
            button: true,
            child: SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: () => context.go('/'),
                style: OutlinedButton.styleFrom(
                  foregroundColor: Colors.red,
                  side: const BorderSide(color: Colors.red),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  minimumSize: const Size.fromHeight(48),
                ),
                child: const Text('Sign Out'),
              ),
            ),
          ),

          const SizedBox(height: 24),
        ],
      ),
      bottomNavigationBar: CareConnectBottomNavBar(
        currentRoute: GoRouter.of(context).routerDelegate.currentConfiguration.uri.path,
      ),
    );
  }

  Widget _sectionHeader(BuildContext context, String title) {
    return Semantics(
      header: true,
      child: Text(
        title,
        style: Theme.of(context).textTheme.titleMedium?.copyWith(
          fontWeight: FontWeight.bold,
          color: Theme.of(context).colorScheme.onSurface,
        ),
      ),
    );
  }

  Widget _infoRow(
    BuildContext context, {
    required String label,
    required String value,
    String? valueSecondary,
    required VoidCallback onTap,
  }) {
    return Semantics(
      label: '$label: $value${valueSecondary != null ? ', $valueSecondary' : ''}',
      button: true,
      child: InkWell(
        onTap: onTap,
        child: ConstrainedBox(
          constraints: const BoxConstraints(minHeight: 48),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      label,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: Colors.grey,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      value,
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    if (valueSecondary != null) ...[
                      const SizedBox(height: 2),
                      Text(
                        valueSecondary,
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ],
                ),
              ),
              const Icon(Icons.chevron_right, color: Colors.grey),
            ],
          ),
        ),
        ),
      ),
    );
  }
}
