import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Download, Smartphone } from "lucide-react";
import { useState } from "react";
import { usePWA } from "@/hooks/usePWA";

const InstallPrompt = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { isInstallable, isInstalled, installApp } = usePWA();

  if (!isInstallable || isInstalled || !isVisible) return null;

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm p-4 shadow-deep bg-gradient-wave border-primary/20 z-50">
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
          <Smartphone className="h-5 w-5 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm mb-1">
            Instalar Surf España
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            Instala la app para acceso rápido y notificaciones de alertas
          </p>
          
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              onClick={installApp}
              className="flex-1 text-xs h-8"
            >
              <Download className="h-3 w-3 mr-1" />
              Instalar
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsVisible(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InstallPrompt;