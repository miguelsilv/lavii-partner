import React from "react";
import { Alert, View, Text } from "react-native";
import { ApiError } from "@/errors";

interface Props {
  children: React.ReactNode;
  signOut: () => Promise<void>;
}

interface State {
  error: Error | null;
  errorType: "friendly" | "unauthorized" | "unknown";
}

export class GlobalErrorBoundary extends React.Component<Props, State> {
  private static readonly knownStatusCodes = new Set([400, 403, 404]);

  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorType: "unknown" };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error) {
    if (error instanceof ApiError) {
      const { statusCode, message } = error;

      if (statusCode === 401) {
        // desloga e reseta o boundary para permitir roteamento
        this.props.signOut()
          .finally(() => {
            // limpa o erro para desmontar o fallback
            this.setState({ error: null, errorType: "unauthorized" });
          });
        return;
      }

      if (GlobalErrorBoundary.knownStatusCodes.has(statusCode)) {
        this.setState({ errorType: "friendly" });
        Alert.alert(message);
        return;
      }
    }

    console.error("Unhandled error in GlobalErrorBoundary:", error);
    this.setState({ errorType: "unknown" });
  }

  renderFallback() {
    const { errorType } = this.state;

    if (errorType === "friendly") {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Ocorreu um erro. Tente novamente mais tarde.</Text>
        </View>
      );
    }

    // No fallback for unauthorized (navegação assume tela de login)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Erro inesperado. Contate o suporte.</Text>
      </View>
    );
  }

  render() {
    return this.state.error ? this.renderFallback() : this.props.children;
  }
}

const styles = {
  container: {
    flex: 1 as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: 16 as const,
  },
  text: {
    fontSize: 16 as const,
    textAlign: 'center' as const,
  },
};
