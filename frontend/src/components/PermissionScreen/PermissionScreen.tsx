interface PermissionScreenProps<T> {
  step: number;

  icon: React.ReactNode;

  title: string;

  subtitle: string;

  buttonTitle: string;

  footer: string;

  requestPermission: () => Promise<T>;

  renderSuccess: (result: T) => React.ReactNode;

  successTitle: string;

  successSubtitle: string;

  onContinue: () => void;
}
