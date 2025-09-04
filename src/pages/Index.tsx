import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HourlyForecast from "@/components/HourlyForecast";
import SurfAlerts from "@/components/SurfAlerts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, User as UserIcon, LogOut } from "lucide-react";
import heroImage from "@/assets/hero-surf.jpg";
import { surfSpots } from "@/lib/spots";
import SurfConditionsWrapper from "@/components/SurfConditionsWrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

// Helper Component: AuthSection
const AuthSection = ({
  loading,
  user,
  isAuthDialogOpen,
  setAuthDialogOpen,
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  handleSignUp,
  handleLogout,
}: any) => {

  if (loading) {
    return <div className="h-10 w-24 rounded-md bg-white/20 animate-pulse" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-white text-sm">
          Hola, {user.displayName || user.email}
        </div>
        <Button variant="secondary" size="sm" asChild>
          <Link to="/cuenta">Mi Cuenta</Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-white hover:bg-white/20 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isAuthDialogOpen} onOpenChange={setAuthDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <UserIcon className="mr-2 h-4 w-4" />
          Mi Cuenta
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[425px] rounded-lg">
        <DialogHeader className="mb-4">
          <DialogTitle>Acceso de Usuario</DialogTitle>
          <DialogDescription>
            Accede a tu cuenta o crea una para guardar tus spots y recibir alertas.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registro</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="login-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="col-span-3"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="login-password" className="text-right">
                    Contraseña
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="col-span-3"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Iniciar Sesión</Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="register-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="col-span-3"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="register-password" className="text-right">
                    Contraseña
                  </Label>
                  <Input
                    id="register-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="col-span-3"
                    placeholder="Mín. 6 caracteres"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Crear Cuenta</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const clearCredentials = () => {
    setEmail("");
    setPassword("");
  }

  const handleSignUp = async () => {
    if (!email || !password) {
      toast({ title: "Error", description: "Email y contraseña son requeridos.", variant: "destructive" });
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({ title: "Éxito", description: "Cuenta creada correctamente. ¡Bienvenido!" });
      setAuthDialogOpen(false);
      clearCredentials();
    } catch (error: any) {
      toast({ title: "Error de Registro", description: error.message, variant: "destructive" });
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast({ title: "Error", description: "Email y contraseña son requeridos.", variant: "destructive" });
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Éxito", description: "Has iniciado sesión." });
      setAuthDialogOpen(false);
      clearCredentials();
    } catch (error: any) {
      toast({ title: "Error de Inicio de Sesión", description: error.message, variant: "destructive" });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: "Sesión Cerrada", description: "Has cerrado sesión correctamente." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const hourlyData = [
    { time: "12:00", waveHeight: "1.2m", windSpeed: "12km/h", rating: 'good' as const },
    { time: "13:00", waveHeight: "1.4m", windSpeed: "10km/h", rating: 'excellent' as const },
    { time: "14:00", waveHeight: "1.6m", windSpeed: "8km/h", rating: 'excellent' as const },
    { time: "15:00", waveHeight: "1.5m", windSpeed: "11km/h", rating: 'good' as const },
    { time: "16:00", waveHeight: "1.3m", windSpeed: "14km/h", rating: 'good' as const },
    { time: "17:00", waveHeight: "1.1m", windSpeed: "16km/h", rating: 'fair' as const },
    { time: "18:00", waveHeight: "0.9m", windSpeed: "18km/h", rating: 'fair' as const },
  ];

  const filteredSpots = surfSpots.filter(
    (spot) =>
      spot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spot.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-deep overflow-hidden">
        <img
          src={heroImage}
          alt="Surfing conditions in Cataluña"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 to-primary/60" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-between">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-2">
              Surf España
            </h1>
            <p className="text-xl opacity-90 mb-4">
              Las mejores condiciones de surf en tiempo real
            </p>
            <div className="flex items-center space-x-2 text-sm opacity-80">
              <MapPin className="h-4 w-4" />
              <span>Costa Española • Actualizado hace 5 minutos</span>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <AuthSection
              loading={loading}
              user={user}
              isAuthDialogOpen={isAuthDialogOpen}
              setAuthDialogOpen={setAuthDialogOpen}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleSignUp={handleSignUp}
              handleLogout={handleLogout}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Current Conditions Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-semibold text-foreground whitespace-nowrap flex-shrink-0">
              Condiciones Actuales
            </h2>
            <div className="relative w-full md:max-w-xs flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar playa o región..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card/90 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Surf Spots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSpots.slice(0, 20).map((spot) => (
              <SurfConditionsWrapper key={spot.id} spot={spot} />
            ))}
          </div>

          {/* Hourly Forecast and Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3">
              <HourlyForecast data={hourlyData} />
            </div>
            <div className="lg:col-span-3 mb-4">
              <SurfAlerts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;