import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User as UserIcon, Bell, Map, Heart, Settings, Info, LogOut, Smartphone } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import { onAuthStateChanged, updateProfile, signOut, User } from "firebase/auth";
import { toast } from "@/components/ui/use-toast";

const AccountPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");
      } else {
        navigate("/"); // Redirect to home if not logged in
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSaveProfile = async () => {
    if (user && displayName.trim() !== user.displayName) {
      try {
        await updateProfile(user, { displayName: displayName.trim() });
        toast({ title: "Éxito", description: "Tu nombre ha sido actualizado." });
      } catch (error: any) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: "Sesión Cerrada" });
      navigate("/");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center">
        <p>Cargando cuenta...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 pb-20 pt-12 sm:pt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mi Cuenta</h1>
          <p className="text-muted-foreground">Gestiona tu perfil y configuración</p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5" />
                <span>Perfil</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email || ""}
                  readOnly
                  className="bg-muted cursor-not-allowed"
                />
              </div>
              <Button className="w-full" onClick={handleSaveProfile}>Guardar Cambios</Button>
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
                  <div className="text-sm text-muted-foreground">Recibe notificaciones cuando mejoren las condiciones</div>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-base font-medium">Ubicación</div>
                  <div className="text-sm text-muted-foreground">Permitir acceso a ubicación para mejores recomendaciones</div>
                </div>
                <Switch checked={location} onCheckedChange={setLocation} />
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
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/about-surf">
                  <Info className="h-4 w-4 mr-2" />
                  Sobre la Aplicación
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="mailto:yago@sinaptiks.com">
                  <Settings className="h-4 w-4 mr-2" />
                  Ayuda y Soporte
                </a>
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
              <Button variant="destructive" className="w-full" onClick={handleLogout}>
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