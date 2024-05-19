import { createStackNavigator } from '@react-navigation/stack';
import Bem_Vindo from './pages/index';
import Acesso from './pages/bemVindo';
import noProduto from './pages/noProduto';
import noHistorico from './pages/noHistorico';
import noLista from './pages/noLista'
import criarLista from './pages/criarLista';

const Stack = createStackNavigator();

export default function Routes() {
    return (






        <Stack.Navigator>

            <Stack.Screen
                options={{ headerShown: false }}
                name="index"
                component={Bem_Vindo}
            />

            <Stack.Screen
                options={{ headerShown: false }}
                name="bemVindo"
                component={Acesso}
            />

            <Stack.Screen
                name="noProduto"
                component={noProduto}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="noHistorico"
                component={noHistorico}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="noLista"
                component={noLista}
                options={{ headerShown: false }} />

            <Stack.Screen
                name="criarLista"
                component={criarLista}
                options={{ headerShown: false }} />

        </Stack.Navigator>
    )
} 