import { createStackNavigator } from '@react-navigation/stack';
import Bem_Vindo from './pages/index';
import Acesso from './pages/bemVindo';
import noProduto from './pages/noProduto';
import noHistorico from './pages/noHistorico';
import noLista from './pages/noLista'
import criarLista from './pages/criarLista';
import editarLista from './pages/EditarLista';
import historicoLista from './pages/historicoLista';

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

            <Stack.Screen
                name="EditarLista"
                component={editarLista}
                options={{ headerShown: false }} />

            <Stack.Screen
                name="historicoLista"
                component={historicoLista}
                options={{ headerShown: false }} />

        </Stack.Navigator>
    )
} 