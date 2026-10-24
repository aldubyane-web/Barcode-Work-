import * as React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050B18] text-white flex items-center justify-center p-4 font-sans" dir="rtl">
          <div className="bg-[#081226] border border-[#1A2E4E] rounded-xl max-w-md w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[#FF9F1C]/20 border border-[#FF9F1C]/40 flex items-center justify-center mx-auto mb-4 text-[#FF9F1C]">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">
              نظام مطار الأمير محمد بن عبدالعزيز الدولي
            </h2>
            <p className="text-xs text-white/70 mb-4 leading-relaxed">
              حدث تنبيه أثناء معالجة العرض، يمكنك تحديث الصفحة لإعادة تحميل بيانات المشروع والباركود فوراً.
            </p>
            {this.state.error && (
              <p className="text-[11px] font-mono text-[#FF9F1C] bg-[#050B18] p-2 rounded border border-[#1A2E4E] mb-4 break-words text-left" dir="ltr">
                {this.state.error.message || 'Unknown Error'}
              </p>
            )}
            <button
              onClick={this.handleReload}
              className="w-full py-2.5 px-4 bg-[#FF9F1C] hover:bg-[#FF9F1C]/90 text-[#050B18] font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <RefreshCw className="w-4 h-4" />
              <span>إعادة تحميل النظام (Reload System)</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
