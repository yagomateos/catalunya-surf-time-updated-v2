import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Map, Heart, Settings, Info, LogOut, Smartphone } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [name, setName] = useState("Surfista Anónimo");
  const [email, setEmail] = useState("surfer@ejemplo.com");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Mi Cuenta
          </h1>
          <p className="text-muted-foreground">
            Gestiona tu perfil y configuración
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Perfil</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                />
              </div>
              <Button className="w-full">Guardar Cambios</Button>
            </CardContent>
          </Card>

          {/* Notifications Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notificaciones</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-base font-medium">Alertas de Surf</div>
                  <div className="text-sm text-muted-foreground">
                    Recibe notificaciones cuando mejoren las condiciones
                  </div>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-base font-medium">Ubicación</div>
                  <div className="text-sm text-muted-foreground">
                    Permitir acceso a ubicación para mejores recomendaciones
                  </div>
                </div>
                <Switch
                  checked={location}
                  onCheckedChange={setLocation}
                />
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Playas Visitadas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-sm text-muted-foreground">Favoritas</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5" />
                <span>Aplicación</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/">
                    <Map className="h-4 w-4 mr-2" />
                    Ver Condiciones Actuales
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/mapa">
                    <Map className="h-4 w-4 mr-2" />
                    Explorar Mapa
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/favoritas">
                    <Heart className="h-4 w-4 mr-2" />
                    Mis Favoritas
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* About & Support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="h-5 w-5" />
                <span>Información</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start">
                <Info className="h-4 w-4 mr-2" />
                Sobre Surf España
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Ayuda y Soporte
              </Button>
              <Separator />
              <div className="text-center text-sm text-muted-foreground">
                Surf España v1.0.0
              </div>
            </CardContent>
          </Card>

          {/* Logout */}
          <Card className="border-destructive/20">
            <CardContent className="pt-6">
              <Button variant="destructive" className="w-full">
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;