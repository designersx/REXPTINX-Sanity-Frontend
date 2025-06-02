import { useEffect } from 'react';

export default function RexWidget() {
  useEffect(() => {
    // Check if script is already loaded to avoid duplicates
    if (!document.getElementById('rex-widget-script')) {
      const script = document.createElement('script');
      script.id = 'rex-widget-script';
      script.src = 'https://fabulous-bombolone-a93c14.netlify.app/index.js?agentId=agent_542f5733db8a5c42139313349b';
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return <div id="rexWidgetContainer"></div>;
}
