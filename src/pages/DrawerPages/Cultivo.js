import React, { Component, useState, useEffect } from 'react';

import {
  View,
  Image,
  ScrollView, Text, FlatList,
  StyleSheet, Alert, Modal, TouchableHighlight, TouchableOpacity, Dimensions, SafeAreaView
} from 'react-native';

import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph, Dialog, Portal, Provider,
  TextInput, DataTable, Divider, Caption, Subheading, Appbar } from 'react-native-paper';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  AdMobBanner
} from 'expo-ads-admob';

export default function Cultivo({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [data, setData] = useState({});
  const [tempo, setTempo] = useState({ "coord": { "lon": -53.46, "lat": -24.96 }, "weather": [{ "id": 800, "main": "Clear", "description": "Carregando...", "icon": "01d" }], "base": "stations", "main": { "temp": 296.94, "feels_like": 294.91, "temp_min": 296.94, "temp_max": 296.94, "pressure": 1014, "humidity": 54, "sea_level": 1014, "grnd_level": 927 }, "visibility": 10000, "wind": { "speed": 4.66, "deg": 23 }, "clouds": { "all": 0 }, "dt": 1598709074, "sys": { "country": "BR", "sunrise": 1598694499, "sunset": 1598736084 }, "timezone": -10800, "id": 3466779, "name": "Cascavel", "cod": 200 });

  (async () => {
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=cascavel&appid=1e447c6efdbf13a64ac1a7f69f4dfdd4&lang=pt_br');
    const extract = await response.json();

    setTempo(extract);

  })();

  //console.log(tempo["weather"][0]["description"]);

  const state = {
    animais: [
      {
        id: 1,
        imagem: require('./../../resources/Plantas/Vaca.png'),
        title: 'Vacas',
        imagem2: require('./../../resources/Plantas/Vaca_banner.jpg'),
        descricao: '',
        descricao_2: '• O concentrado para vacas em lactação deve apresentar 18 a 22% de proteína bruta (PB) e acima de 70% de nutrientes digestíveis totais (NDT), na base de 1 kg para cada 2,5 kg de leite produzidos. Pode-se utilizar uma mistura simples à base de milho moído e farelo de soja ou de algodão, calcário e sal mineral ou, dependendo da disponibilidade, soja em grão moída ou caroço de algodão.\n•  Os locais como cochos e bebedouros devem ser devidamente higienizados todos os dias: não deixe que resíduos permaneçam de uma alimentação para outra, pois isso pode prejudicar a saúde dos animais.\n• Para sair na frente dos seus concorrentes é fundamental que haja investimento em especialização para atuar nesse segmento. O conhecimento é a base para se consolidar em qualquer mercado, especialmente nesse que envolve questões sanitárias de grande peso.\n• As vacas leiteiras necessitam de longos períodos de tempo, para consumir todos os nutrientes que necessitam ao longo do dia, além disso, também precisam de tempo para ruminar, descansar e evitar o calor. Assim é importante que o proprietário do rebanho encontre formas de facilitar o acesso e o manejo das pastagens.',
        descricao_3: '• É importante remover todo muco da narina e da boca do bezerro. Se necessário, estimule  a respiração, fazendo cócegas na narina e massagem torácica.\n•  É recomendado secar o bezerro após o parto. Se as condições forem propícias, com ingestão de colostro, boa cobertura vegetal no piquete e ambiente favorável, entre 48 a 72h de vida sua temperatura estará normal.\n• Fornecer colostro para o bezerro nas 6 primeiras horas de vida é de extrema importância. Após este período, a taxa de absorção diminui muito.  Toda a proteção do bezerro durante as primeiras duas semanas de vida será promovida pelos anticorpos absorvidos do colostro. Como o contato com os agentes patogênicos muitas vezes acontece antes mesmo do contato com o colostro, é essencial garantir uma boa colostragem.\n• Para cada raça animal existe uma quantidade sugerida de colostro a ser oferecida. Em média os pesquisadores acreditam que 4 litros de um colostro de boa qualidade sejam capazes de suprir as necessidades do bezerro.  ',
      },

      {
        id: 2,
        imagem: require('./../../resources/Plantas/Porco.png'),
        title: 'Porcos',
        imagem2: require('./../../resources/Plantas/Porco_banner.jpg'),
        descricao: '',
        descricao_2: '• Faça uma cerca bem resistente de malha de arame e com tábuas na base para que os animais não tentem cavar.\n Porcos ganham queimaduras solares quando não podem se proteger da luz solar direta ou do calor, e fogem do frio e do vento nas partes frias do ano. A melhor solução é construir na área cercada uma estrutura coberta e com três lados.\n Porcos bebem muita água: em média, 8~15 L por dia. Afixe o cocho ao solo e reabasteça a água ao longo do dia. Se você apenas deixar o cocho na terra, os animais provavelmente o tombarão para brincar na água.\n Um leitão de 22 kg deve receber 16% de proteínas todos os dias, ao passo que um animal de 57 kg pode receber uma ração com 14% de proteínas — embora muitos fazendeiros optem por manter o regime de 16%. Um porco engorda em média 450 g por dia.\n O hábito de chafurdar na lama e no esterco deixa os porcos vulneráveis a parasitas. Peça ao seu veterinário uma receita de anti-helmíntico para matar os vermes que eles tenham porventura contraído.',
        descricao_3: '• A lavagem pode ser feita de frutas, vegetais, restos de carne, aparas de plantas do jardim e até ovos podres. Mas não custa relembrar: não alimente porcos apenas com lavagem\n Não compre um porco jovem demais — ele deve passar pelo menos seis semanas com a mãe.\n Nunca alimente porcos com carne crua, que pode transmitir doenças e tornar proibida a comercialização de sua produção, caso fique comprovado que os animais tiveram acesso a esse tipo de alimento.\n Não deixe os leitões irem para a poça de lama com porcos adultos. Os leitõezinhos precisam de uma trincheira própria. Animais adultos são desatentos e podem ferir ou matar um filhote por acidente.',
      },

      {
        id: 3,
        imagem: require('./../../resources/Plantas/Ovelha.png'),
        title: 'Ovelhas',
        imagem2: require('./../../resources/Plantas/Ovelha_banner.jpg'),
        descricao: '',
        descricao_2: '• Proteger as ovelhas do sol, chuva e vento é essencial para que elas se mantenham saudáveis. Se não for possível disponibilizar um celeiro, um abrigo com três lados cumpre bem a função. A vantagem do celeiro é a possibilidade de separar os animais doentes ou prenhas do restante do rebanho.\n Se as ovelhas estão em uma região mais fria ou com clima mais ameno, a tendência é que elas passem maior tempo no abrigo, por isso, é fundamental se preocupar com a cama delas. O feno é o ideal, pois as mantém secas e é confortável. Providencie uma camada espessa que garantirá um bom descanso aos animais. Para ambientes mais quentes, a palha é uma opção.\n Pastagem e feno devem compor a alimentação dos animais. As ovelhas comem cerca de 0,5 kg de feno para cada 45kg de seu próprio peso. Se a área for suficiente para isso, não será necessário complementar a alimentação. Atenção: evite dar grãos em excesso às ovelhas, pois podem deixá-las inchadas e até levar a óbito. Ovelhas lactantes, jovens ou idosas podem ter sua dieta complementada com uma mistura básica de milho, soja e aveia. Consulte sempre um profissional antes de qualquer mudança brusca na alimentação.\n O consumo de água pelas ovelhas é de aproximadamente 7,5 litros por dia, por isso, certifique-se que a água oferecida está fresca e limpa. O recipiente deve estar livre de algas que possam contaminar a água. Recomenda-se a limpeza do local ao menos 1 vez por semana.\n ',
        descricao_3: '• As ovelhas pastam por aproximadamente 7 horas por dia, portanto, a área do pasto deve ser proporcional à quantidade de animais. O cálculo considera, além do clima, localização e da condição do pasto, cerca de 0,8 hectares para 6 ovelhas.\n A lã produzida pelas ovelhas muda ao longo de sua vida, com o passar do tempo a lã muda de textura, cor e densidade. Isso acontece da mesma forma que os pelos e fios de cabelo do nosso corpo com o passar do tempo.Quanto mais velha, mais fofa e resistente é a lã produzida.\n Dica bônus: o rebanho leiteiro nacional de ovelhas ainda é muito pequeno, ou seja, um campo que pode ser explorado por pequenos e médios produtores. O leite de ovelha pode ser usado para produção de queijos e outros derivados e é dotado de alta concentração de proteínas, lipídios, minerais e vitaminas.',
      },

      {
        id: 4,
        imagem: require('./../../resources/Plantas/Galinha.png'),
        title: 'Galinha',
        imagem2: require('./../../resources/Plantas/Galinha_banner.jpg'),
        descricao: '',
        descricao_2: '• Providencie pelo menos 60 cm de espaço para cada galinha. Providencie também uma espécie de ninho onde elas possam botar seus ovos.\n Garanta comida de qualidade para suas galinhas. Cada galinha deve receber um tipo de ração adequado à idade. Dê cerca de 90 g de comida para cada galinha. Os pintinhos devem receber cerca de 60 g cada.\n Não deixe de providenciar bastante água para as galinhas. Um galão de água é o suficiente para até três ou quatro galinhas, mas caso você tenha mais galinhas você deve fornecer mais água.\n Dependendo do tamanho do galinheiro, coloque de 4 a 6 galinhas nele, de forma que elas não fiquem apertadas ou queiram brigar. Na maior parte do tempo, as galinhas são bem cordiais umas com as outras',
        descricao_3: '• Galinhas amam sobras de comida. Você pode dar cereais, pães velhos e quaisquer tipos de verduras e frutas. Mas, nunca lhes dê abacate! O abacate é venenoso para todos os tipos de pássaros.\n Os galos podem acabar machucando as galinhas na tentativa de fazê-las se acasalarem com ele. Suas unhas afiadas podem machucar as galinhas terrivelmente! Se você tiver um galo o coloque em um lugar separado das galinhas.',
      },

      {
        id: 5,
        imagem: require('./../../resources/Plantas/Pato.png'),
        title: 'Patos',
        imagem2: require('./../../resources/Plantas/Pato_banner.jpg'),
        descricao: '',
        descricao_2: '• Um pato precisa de aproximadamente entre 170 e 200 gramas de alimento por dia. A sua dieta pode ser muito variada incluindo alimentos como verduras, sementes, grãos, insetos e alguns peixes\n Alimente os patinhos fracos com gema de ovo de pata. Os bem fraquinhos podem precisar de um pouco mais de gema antes de passarem para a ração. Dê a eles purê de gema de ovo de pata até que comecem a se interessar na ração.\n Mantenha os patinhos a salvo de predadores. Patos, principalmente mais jovens, podem ser alvos fáceis. Você pode soltá-los quando se tornarem adultos, mas lembre-se de que pode perdê-los ocasionalmente para predadores. É preciso se esforçar muito para mantê-los a salvo.\n Não os alimente com cebola, sementes para pássaros selvagens ou de gaiola, ou qualquer tipo de pão. É possível alimentá-los com ração inicial para patos, ervilhas, milho, feijão verde, feijão, cenoura cozida, ovos cozidos, tomates, grilos, minhocas, peixes pequenos, grama, leite e ração para peru.',
        descricao_3: '• Os patos precisam de espaço ao ar livre para caminhar e esticar suas asas. Mantê-los 24 horas em espaços fechados, sem receber os raios de sol de maneira direta, poderá deixá-los deprimidos.\n Não tente alimentá-los com frutas vermelhas ou uvas.\n Depois que os patos estiverem numa fonte ou numa lagoa, é possível dar comida flutuante para peixe ou comida de cachorro em pequenas quantidades.',
      },

      {
        id: 6,
        imagem: require('./../../resources/Plantas/Cavalo.png'),
        title: 'Cavalos',
        imagem2: require('./../../resources/Plantas/Cavalo_banner.jpg'),
        descricao: '',
        descricao_2: '•  Éguas em lactação tem sua necessidade de água aumentada em até 30 litros por dia.\n Alimente-o com meio fardo de feno esverdeado, o que é aproximadamente 2% do peso do seu corpo. O fardo pode ser grama ou alfafa, ou até mesmo uma mistura.Complemente a metade do fardo com grãos, aveia ou doces duas vezes ao dia. É melhor alimentá-los no mesmo horário todos os dias.\n Muitos cavalos podem adoecer se o feno estiver num local sujo, então mantenha o feno longe do chão. \n Banhe o seu cavalo em dias quentes. Certifique-se de usar shampoo anti fungos. Com a água, o óleo na pele do seu cavalo é removido durante o banho. Você terá de banhá-lo quando não estiver chovendo, ou terá que colocar um cobertor a prova de água nele depois do banho.\n',
        descricao_3: '• Se o cavalo for calçado, limpe a cada 6 semanas. Se não for calçado, limpe a cada 8 semanas.\n Nunca faça movimentos bruscos perto de um cavalo que você acabou de comprar, pois ele precisa de tempo pra conhecer você.\n Nunca caminhe bem do lado de um cavalo. Você pode pensar que o conhece, mas ele pode te chutar por qualquer motivo.\n Ao mudar a dieta do cavalo, comece o processo gradativamente com quantidades moderadas de comida por vez, para permitir que o cavalo se acostume com a nova comida.',
      },

      {
        id: 7,
        imagem: require('./../../resources/Plantas/Coelho.png'),
        title: 'Coelhos',
        imagem2: require('./../../resources/Plantas/Coelho_banner.jpg'),
        descricao: '',
        descricao_2: '• O coelho precisa de uma tigela para ração. Compre uma feita de um material pesado, como cerâmica, para o animal não virar o objeto sem querer (o que acontece bastante).\n Grama e feno são os dois alimentos que o intestino dos coelhos tem mais facilidade de processar. Sendo assim, compre um feno verde fresco de qualidade e use na alimentação do seu pet.\n Suplemente a alimentação do coelho com pellets de ração e frutas e vegetais frescos. Brócolis, repolho-chinês, pedaços de cenoura e beterraba, coentro, couve-galega, couve-de-bruxelas, couve-de-folhas e repolho são alguns dos melhores exemplos de vegetais.\n Castre o coelho se você pretende adotar um macho e uma fêmea ao mesmo tempo. Até irmãos de ninhada cruzam e acabam gerando filhotes. Além disso, as fêmeas já atingem a maturidade sexual por volta dos cinco meses de vida. Se não for castrado, o macho vai tentar copular o tempo todo (inclusive com outras raças).',
        descricao_3: '• Só dê cerca de 1 colher de sopa de petiscos ao coelho por dia, ou o nível de açúcar no sangue dele vai aumentar bastante.\n Nunca assuste o coelho. Ele pode sofrer um ataque cardíaco fulminante.\n Dê uma olhada nos dentes do coelho uma vez por mês. Eles podem ficar desalinhados e precisar de ajustes. Nesse caso, consulte o veterinário se o bicho não conseguir comer direito ou ficar babando o tempo todo.',
      },

      {
        id: 8,
        imagem: require('./../../resources/Plantas/Peixe_banner.png'),
        title: 'Peixes',
        imagem2: require('./../../resources/Plantas/Peixe.jpg'),
        descricao: '',
        descricao_2: '• Os açudes empregados para a criação de peixes, podem ser de 3 tipos, quanto à sua construção:por barragem por escavação e por aterro das margens\n O tipo preferido é, em geral, o de barragens, por ser o mais prático para ser construído e o que, normalmente, se torna mais econômico. Ele é adotado, principalmente, nos leitos de córregos e ribeirões, em escavações formando crateras ou sulcos. É aconselhável, no entanto, que seja removida toda a terra vegetal, antes do levantamento da barragem, para que ela fique com a colocação de terra argilosa, para substituir a que foi retirada, apoiando-se em uma base sólida.\n Essa barragem deve ter mais de 1m de altura acima do nível da água existente no açude, uma largura equivalente a 3 vezes a sua altura e sua parte superior com uma largura de, no mínimo, 2m, para permitir a passagem de veículos, inclusive carros e carroças.\n ',
        descricao_3: '• Os açudes por escavação não são aconselháveis, porque sua construção é muito cara, embora eles possam ter uma profundidade de apenas 2m.\n Por aterro construído por aterro de suas margens, pode ter profundidade de 1,5 a 2m. Embora mais barata do que a dos açudes do tipo anterior (por escavação), também é muito cara. Normalmente, esse tipo de açude é construído em terrenos planos, sendo empregada a mesma técnica indicada para a construção de barragens.',
      },
    ],
    agroFlorestas: [
      {
        id: 1,
        imagem: require('./../../resources/Plantas/Agro.png'),
        title: 'Vacas',
        imagem2: require('./../../resources/Plantas/agro_banner.png'),
        descricao: 'SAFs-Sistema de AgroFlorestais',
        descricao_2: '• Um Sistema Agroflorestal, comumente chamado pela abreviação ‘SAF’, é uma forma de uso da terra na qual se resgata a forma ancestral de cultivo, combinando espécies arbóreas lenhosas como frutíferas ou madeireiras com cultivos agrícolas e/ou animais. Essa combinação pode ser feita de forma simultânea ou em seqüência temporal, trazendo benefícios econômicos e ecológicos.\n• Agrofloresta é um sistema ancestral de uso da terra que vem sendo praticado por milhares de anos por agricultores de todo o mundo. No entanto, nos anos mais recentes, também têm sido desenvolvida como uma ciência que se compromete a ajudar agricultores a incrementar produtividade, rentabilidade e sustentabilidade em suas terras.\n• A Agrofloresta é um sistema de produção que imita o que a natureza faz normalmente, com o solo sempre coberto pela vegetação, muitos tipos de plantas juntas, umas ajudandos as outras, sem problemas com “pragas” ou “doenças”, dispensando o uso de venenos. Nos Sistemas Agroflorestais, encontramos uma mistura de culturas anuais, árvores perenes e frutíferas e leguminosas, além de criação de animais e a própria familia de agricultores, em uma mesma área.',
        descricao_3: '• As primeiras receitas, ainda no primeiro ano, são provenientes das espécies anuais (feijão, arroz, milho),  hortaliças, adubos verdes (feijão-de-porco, guandu, crotalária,) e espécies semi-perenes (mandioca, abacaxi, banana, mamão), podendo ser comercializadas nos primeiros 3 anos, em média. A produtividade das culturas anuais e semi-perenes diminui à medida que ocorre o aumento do sombreamento e competição com as espécies lenhosas.\n• Nesta fase os SAFs atingem boa maturidade, as espécies frutíferas iniciaram sua fase produtiva a partir do quarto ano e já atingiram sua estabilidade produtiva aos 10 anos. As espécies madeiráveis podem ser colhidas entre os 6 e 10 anos para fornecer energia (Eucalipto, por exemplo). Esta fase apresenta uma redução na demanda de mão-de-obra devido a menor intensidade nas atividades de manutenção das espécies frutíferas e madeiráveis.',
      },
    ],
    plantas: [
      {
        id: 1,
        imagem: require('./../../resources/Plantas/Pessego.png'),
        title: 'Pêssego',
        imagem2: require('./../../resources/Plantas/Pessego_tumb.png'),
        descricao: 'Família das Rosáceas',
        descricao_2: '• Faça covas 60 x 60 x 60 centímetros. Elas devem ser estercadas e adubadas antes do plantio.\n• Escolha locais onde a temperatura no verão é alta de dia e amena à noite, há boa intensidade de luz, pouco vento e bom suprimento de água.\n• Faça análise do solo em três profundidades, de zero a 20 centímetros, de 20 a 40, e de 40 a 60. Neutralize a acidez com calcário, três meses antes do cultivo;\n• Após a correção introduza duas fontes de fósforo: de liberação lenta e rápida. Coloque o mais profundo possível o dobro da quantidade do material indicado na análise. Prepare o terreno com uma subsolagem de 60 centímetros.\n• Alinhe o plantio em nível ou ligeiramente em desnível, para aproveitar o sistema de irrigação e infiltração da água das chuvas. Antes do cultivo, levante uma leira com 20 centímetros de altura, para impedir erosão.\n• Escolha mudas que apresentem de três a quatro brotações primárias e com o broto principal ignificado, sem sinais de enrugamento e com gemas maduras.\n• A união do enxerto não pode ter trincas; o ramo principal precisa ter entre dez e 30 milímetros a 20 centímetros do enxerto.',
        descricao_3: '• A poda deve ser feita no período de repouso, em junho nas regiões mais quentes e, em locais mais frios, no final de junho e início de julho.\n• Inicie 15 dias antes da floração e mantenha a prática até que as plantas apresentem cerca de 25% de flores abertas.\n• A colheita do pêssego pode ser feita em cestas ou caixas plásticas, assim que a pele do fruto começar a mudar da cor verde para amarelo-claro.',
      },
      {
        id: 2,
        imagem: require('./../../resources/Plantas/Abobora.png'),
        title: 'Abobora',
        imagem2: require('./../../resources/Plantas/Abobora_tumb.png'),
        descricao: 'Família das cucurbitáceas',
        descricao_2: '• Para o cultivo, separe para cada cova três sementes. Elas podem ser adquiridas em supermercados, cooperativas e lojas agrícolas. Plante sobretudo em terrenos arenosos, profundos, com boa drenagem e nunca nos encharcados.\n• Faça covas rasas, com dois ou três centímetros de profundidade e de um a dois metros de espaço entre elas. Entre as linhas mantenha distância de quatro metros. Adube com esterco de curral bem curtido e, segundo análise do solo, acrescente suplementação necessária.\n• No desenvolvimento da planta, quando surgirem de três a quatro folhas, mantenha só as mais vigorosas. É bom evitar defensivos agrícolas, pois a frutificação ocorre naturalmente com a presença de abelhas ou inseto polinizador.\n• Caso seja necessário o uso de produto químico, evite radicalmente a aplicação pela manhã, pois é nesse período do dia que ocorre a abertura das flores e a polinização.\n• A cultura pode ser irrigada do início do plantio até quando os frutos estiverem na fase de maturação. Em 120 dias, estarão prontos para a colheita. Apresentam diferentes variedades, que possuem características específicas quanto a cor, tamanho e peso.', descricao_3: '• A poda deve ser feita no período de repouso, em junho nas regiões mais quentes e, em locais mais frios, no final de junho e início de julho.\n• Inicie 15 dias antes da floração e mantenha a prática até que as plantas apresentem cerca de 25% de flores abertas.\n• A colheita do pêssego pode ser feita em cestas ou caixas plásticas, assim que a pele do fruto começar a mudar da cor verde para amarelo-claro.',
        descricao_3: '• Desde que mantidas em local fresco, seco e à sombra, as abóboras podem ser consumidas até três meses depois da colheita. Não retire os cabos dos frutos, pois eles ajudam a conservar por mais tempo e evitam a entrada de patógenos.\n• As abóboras boas têm casca opaca. Quando brilhosa, indica que os frutos foram colhidos novos e, por isso, o amadurecimento não será completo.\n• Evite frutos machucados, sinais de mofo e podridão, pois se estragam com rapidez.'
      },
      {
        id: 3,
        imagem: require('./../../resources/Plantas/Alface.png'),
        title: 'Alface',
        imagem2: require('./../../resources/Plantas/Alface_banner.jpg'),
        descricao: 'Família das Asteraceae',
        descricao_2: '• Inicie o processo abrindo as covas, que devem ter aproximadamente 10 cm de profundidade e 8 cm de largura.\n• Coloque 3 sementes juntas e feche os buracos com uma camada de terra, esse processo de germinação dura 15 dias.\n• Irrigue, com intervalo de um dia, sua planta. Tenha cuidado para não encharcar o solo.\n• Atente-se ao cuidado com insetos e fungos, para não acabar com o seu canteiro.\n• Cuide da sua plantação diariamente, retirando manualmente o aparecimento de pragas, que possam vir a aparecer.\n• Após 50 dias do início do plantio, é hora da colheita. Basta cavar ao redor da planta e puxá-la.',
        descricao_3: '• Como escolher a alface no mercado. Quando o intuito é comprar o pé de alface, as folhas devem estar firmes, brilhantes e sem áreas escuras.\n •Aprenda a conservar a alface. Chegando em casa, o mais indicado é colocá-la na geladeira. De preferência na parte inferior, onde a temperatura é mais amena.\n• Na geladeira, deve ser mantida em saco plástico e ter as folhas retiradas de acordo com a necessidade de consumo. Recomenda-se que o consumo seja feito em no máximo três ou quatro dias.',
      },
      {
        id: 4,
        imagem: require('./../../resources/Plantas/Banana.png'),
        title: 'Banana',
        imagem2: require('./../../resources/Plantas/Banana_banner.jpg'),
        descricao: 'Família das Musaceae',
        descricao_2: '• Época- Em locais com boa irrigação, a plantação de mudas de bananeira se dá bem em qualquer período do ano. Porém, se a região for mais seca, a melhor época é o início da estação das chuvas.\n• Local - As regiões úmidas e com chuvas regulares são as mais indicadas para o plantio de bananeiras. A planta também gosta de temperaturas quentes, desde que não seja em excesso. Locais onde ocorrem períodos abaixo de 15 graus devem ser evitados, pois não toleram geadas.\n• Solo - Deve ser drenado e livre de encharcamento; o excesso de água leva as raízes ao apodrecimento. Escolha áreas pouco acidentadas, planas ou com declive abaixo de 8%. A profundidade deve ser acima de 25 centímetros. Mantenha o solo limpo com capinas regulares. Com facão, retire as folhas velhas e as brotações supérfluas.\n• Adubação - Para o preparo da terra, pode ser usada como adubo uma das seguintes opções: dez litros de esterco de curral curtido; dois litros de esterco de aves; ou um litro de torta de mamona. Mas, como a planta pede a adição de nutrientes, sobretudo potássio, é importante analisar o solo para determinar a adubação e a calagem.\n• Semeadura - O plantio das mudas é feito em covas de 30 x 30 x 30 centímetros. Também podem ser abertos sulcos em nível, com 30 centímetros de profundidade. O espaçamento é medido de acordo com o porte da cultivar: se alto, recomenda-se 2 x 3 metros ou 3 x 3 metros; se baixo ou médio, a indicação é de 2 x 2 metros ou 2 x 2,5 metros. Mantenha só uma família por cova.\n• COLHEITA - Um ano depois do plantio e pode durar o ano todo. A colheita deve ser feita com cuidado, pois qualquer batida causa escurecimento dos frutos.',
        descricao_3: '• Separe as bananas do cacho, cortando cada unidade sem danificar ou abrir a fruta.  Essa etapa é fundamental, pois se a banana despencar do cacho e deixar aberturas o amadurecimento é mais rápido.\n• Coloque filme plástico na ponta da banana para evitar que ocorra abertura na fruta, assim você consegue deixar os bichinhos longe da sua cozinha.',
      },
      {
        id: 5,
        imagem: require('./../../resources/Plantas/Batata.png'),
        title: 'Batata',
        imagem2: require('./../../resources/Plantas/Batata_banner.jpg'),
        descricao: 'Família das Solanaceae',
        descricao_2: '• Pegue uma batata ou batata-doce. Escolha a mais bonita e saudável. É essencial que seja orgânica.\n• Lave-a bem.\n• Separe um recipiente com água, de preferência um pote de vidro, com a boca maior do que a largura da batata.\n• Coloque de quatro a seis palitos de dente ao redor da batata, de maneira que eles suspendam o tubérculo na boca do pote. Para facilitar o processo, a batata pode ser cortada ao meio ou em pedaços menores.Deixe metade da batata dentro da água e a outra metade para fora, com o recipiente aberto.\n• Acomode o pote em um local que recebe luz em abundância. O ideal é que seja perto de uma janela, mas também pode ser luz artificial.\n• Espere por duas a quatro semanas. Após esse período, a batata começará a brotar.\n• Quando a batata estiver coberta por essas ramificações, torça cada uma delas para retirá-las por inteiro.\n• Acomode os pequenos galhos em um recipiente com água e aguarde até que novos raminhos cresçam, essa é a raiz da batata.\n• Quando chegar a este ponto, a sua mudinha estará pronta para ser transplantada para a terra.',
        descricao_3: '• A batata achat é mais recomendada para o cozimento, já que tem pouca matéria seca, condição que prejudica a sua fritura.\n• A batata atlantic, por sua vez, pode ser frita, mas como tem formato oval-arredondado, é ideal para formar chips e não batatas-fritas em palito.\n• Já a batata baronesa e a baraka podem ser usadas para diversas formas de preparo.',
      },
      {
        id: 6,
        imagem: require('./../../resources/Plantas/Beterraba.png'),
        title: 'Beterraba',
        imagem2: require('./../../resources/Plantas/Beterraba_banner.jpg'),
        descricao: 'Família das Amaranthaceae',
        descricao_2: '• Antes de adubar, faça análise do solo, seguida da calagem, se necessário. Com 30 dias de antecedência do início da semeadura ou transplante, aplique 20 toneladas por hectare de esterco de curral bem curtido. Aumente a quantidade para 30 toneladas em caso de o cultivo ocorrer em solos arenosos.\n•  Para a semeadura, mantenha espaçamento entre as linhas de 20 a 30 centímetros; no transplante ou após o raleio, a recomendação é manter de dez a 15 centímetros entre plantas.\n• De um a dois centímetros é a profundidade ideal para semear beterraba. A semeadura pode ser realizada em bandejas específicas, que são vendidas no varejo, ou diretamente no local definitivo. Após 20 dias, o transplante para o campo já pode ser feito.\n• Outra opção é utilizar canteiros (sem alvenaria) com um a 1,2 metro de largura e de 20 a 30 centímetros de altura; entre um canteiro e outro, deve-se deixar um espaço de 40 a 50 centímetros. Neste caso, as mudas estarão prontas para o transplante depois de 20 a 30 dias após a semeadura.\n•  No sistema de semeadura direta, a beterraba pode ser colhida de 60 a 70 dias após o cultivo. Para mudas transplantadas, leva de 90 a 100 dias para começar a apanhar a hortaliça. Quando atingirem de seis a oito centímetros de diâmetro, as raízes estão no ponto de colheita.\n ',
        descricao_3: '• Plantio: ano todo em áreas acima de 800 metros de altitude e de clima frio.\n• Solo: leve, com boa drenagem.\n• Temperatura ideal: na faixa de 10 a 20 graus\n• Colheita: de 70 a 100 dias após o início do plantio.\n Área mínima: pequenos canteiros e caixotes',
      },
      {
        id: 7,
        imagem: require('./../../resources/Plantas/Cebola.png'),
        title: 'Cebola',
        imagem2: require('./../../resources/Plantas/Cebola_banner.jpg'),
        descricao: 'Família das Amaryllidaceae',
        descricao_2: '• A escolha de cultivar depende das condições climáticas do local de plantio. As consideradas comerciais são classificadas em dois grupos: as de dias curtos, com pelo menos 12 horas de luz, e as de dias intermediários, com 13 ou mais horas de luz.\n• Em regiões ou épocas do ano sujeitas a alta umidade, adote espaçamentos mais amplos entre as plantas, ao passo que, em locais ou épocas de baixa umidade, os menores são mais adequados. Populações em torno de 500 mil plantas por hectare resultam, no geral, em bons rendimentos e bulbos de boa qualidade.\n• A cebola não tem muitos prejuízos com o ataque de insetos, ácaros e outras pragas, pois muitas delas são esporádicas e regionais. Se não controlados, no entanto, os tripes podem causar danos severos à cultura. A dica é acompanhar as etapas de produção e venda, como plantio no campo, pós-colheita, transporte, armazenamento e comercialização, nas quais algumas doenças se destacam.\n• A colheita é indicada, no entanto, assim que de 40% a 70% das folhas tornarem-se amarelecidas ou secas. A produtividade é maior quando as plantas são colhidas com as folhas totalmente secas, porém, as cebolas têm um prazo de prateleira menor.',
        descricao_3: '• Solo: úmido\n Clima: temperatura na faixa de 20 ºC a 25 ºC.\n• Área mínima: uma cebola ocupa uma área de 15 centímetros quadrados.\n• Colheita: de 100 a 180 dias após o início do plantio, dependendo de cultivar, local e época do ano.\n• Custo: sementes convencionais são mais baratas que as híbridas, enquanto o uso de bulbinhos tem preço alto; há produtores que terceirizam a preparação de mudas com viveiristas',
      },
      {
        id: 8,
        imagem: require('./../../resources/Plantas/Cenoura.png'),
        title: 'Cenoura',
        imagem2: require('./../../resources/Plantas/Cenoura_banner.jpg'),
        descricao: 'Família das Apiaceae',
        descricao_2: '• Eles devem ter de 80 centímetros a 1,40 metro de largura, e de 25 a 30 centímetros de altura, montados a 30 centímetros uns dos outros.\n• Sobre os canteiros, trace sulcos com um ou dois centímetros de profundidade e distantes 20 centímetros.\n• Após o plantio, regue o canteiro para iniciar o processo de germinação. Em pequenas áreas, o sistema de aspersão convencional é o mais adotado, enquanto nas grandes é o pivô central.\n• Quando as folhas mais velhas amarelam, secam e se curvam, é sinal de que as raízes começaram a amadurecer. A colheita já pode ser iniciada. Essa etapa varia de 80 a 120 dias após a semeadura.',
        descricao_3: '• Solo: de textura média, com bom nível de matéria orgânica e pH em torno de 6.\n• Clima: faixa ideal para germinação entre 20 e 30 graus.\n• Área minima: canteiros de 0,8 a 1,4 metro de largura, e de 15 a 30 centímetros de altura.\n• Colheita: de 80 a 120 dias após a semeadura.',
      },
      {
        id: 9,
        imagem: require('./../../resources/Plantas/Milho.png'),
        title: 'Milho',
        imagem2: require('./../../resources/Plantas/Milho_banner.jpg'),
        descricao: 'Família das Gramíneas',
        descricao_2: '• Este solo precisa estar em um local com bastante incidência de luz solar, já que a planta depende dessa exposição para evoluir bem. Com essas etapas definidas, você pode começar a planejar o plantio, que pode ser feito diretamente na terra, em sementeiras ou em copinhos feitos com papel jornal.\n• Um ponto importante sobre como plantar milho verde é respeitar a época adequada de plantio do grão. O ideal é que isso aconteça entre outubro e dezembro.\n• Um sinal de que é o momento certo de colher são os estigmas (aquele cabelo que nasce da espiga): assim que ele adquirir um tom marrom, o grão já está pronto para ser tirado do pé. Isso pode acontecer entre 90 e 100 dias após a germinação, dependendo das condições climáticas durante o crescimento da planta.',
        descricao_3: '• Não plante dois tipos diferentes de milho muito próximos na mesma época. Lembre-se que é o vento que poliniza a planta. Se dois tipos estiverem crescendo muito próximos, a espiga pode misturar cores diferentes, de grãos diferentes.\n• Garanta um espaçamento de pelo menos um metro entre as linhas de plantio e 20 centímetros entre as plantas. Se você não tiver muito espaço, esse espaçamento pode ser de 80 centímetros entre as linhas e 20 centímetros entre as plantas.\n• Quer saber como plantar milho verde em vasos? Também é possível! Basta que ele tenha no mínimo 50 centímetros de diâmetro e que as sementes sejam plantadas formando um triângulo (lembre-se sempre da polinização!).',
      },
      {
        id: 10,
        imagem: require('./../../resources/Plantas/Tomate.png'),
        title: 'Tomate',
        imagem2: require('./../../resources/Plantas/Tomate_banner.jpg'),
        descricao: 'Família das Solanaceae',
        descricao_2: '• O cultivo de tomates a partir de sementes leva cerca de 6 a 8 semanas, desde a semeadura até o transplante. As sementes plantadas em local ensolarado crescem mais rápido.\n• As sementes de tomate são pequenas, se você as plantar muito fundo, elas nunca nascerão. Semeie-as com cerca de meio centímetro de profundidade, cobrindo levemente com uma mistura de envasamento umedecida.\n Remova as flores até que as plantas tenham entre 40 a 50 centímetros de altura, para que assim as plantas possam direcionar mais energia para as raízes.',
        descricao_3: '• O mais importante ainda é o solo, que deve ser de alta qualidade, leve e bem drenado. Umedeça a mistura antes de colocar no recipiente.\n•  Existem basicamente 3 tipos de solo, arenoso, siltoso e argiloso. Sendo que o arenoso não retém água, por outro lado o argiloso é o que mais segura água.\n• O fluxo de ar melhora e assim temos menos doenças. Com menos folhas, as plantas podadas são menos densas, permitindo que mais ar se mova pelas plantas. Como resultado as folhas secam mais rápido, evitando fungos.',
      },

    ]
  };

  const LeftContent = props => <Avatar.Icon {...props} icon={require('./../../resources/Plantas/Pessego.png')} />

  return (

    <View>
                <Appbar.Header>
                    <Appbar.Action
                        icon={({ color, size }) => (
                            <Icon
                                name="dots-vertical"
                                color={color}
                                size={size}
                            />
                        )}
                        onPress={navigation.openDrawer}
                    />
                    <Appbar.Content
                        title="Agricultech"
                    />
                </Appbar.Header>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modal3Visible}
        onRequestClose={() => {
          setModal3Visible(!modal3Visible);
        }}
      >
        <View style={styles.container}>
          <ScrollView
            style={styles.plantasContainer}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {state.agroFlorestas.map(agro => (
              <View key={agro.id} style={styles.planta}>
                <ScrollView>
                  <Button
                    onPress={() => {
                      setModal3Visible(!modal3Visible);
                    }}>
                    Sair
            </Button>
                  <Image
                    source={agro.imagem}
                    style={styles.img}
                  />
                  <Text style={styles.title}>{agro.title}</Text>
                  <Text>{"\n"}</Text>
                  <Divider />
                  <Text style={styles.dadosGerais}>{"\n" + agro.descricao + "\n"}</Text>
                  <Divider />
                  <Text style={styles.descricao}>{"\n\nComo plantar:\n" + agro.descricao_2 + "\n\n"}</Text>
                  <Image
                    source={agro.imagem2}
                    style={styles.img2}
                  />
                  <Text style={styles.descricao}>{"\n\nDica:\n\n" + agro.descricao_3}</Text>
                </ScrollView>
              </View>
            ))}

          </ScrollView>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <ScrollView
            style={styles.plantasContainer}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {state.plantas.map(planta => (
              <View key={planta.id} style={styles.planta}>
                <ScrollView>
                  <Button
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    Sair
            </Button>
                  <Image
                    source={planta.imagem}
                    style={styles.img}
                  />
                  <Text style={styles.title}>{planta.title}</Text>
                  <Text>{"\n"}</Text>
                  <Divider />
                  <Text style={styles.dadosGerais}>{"\n" + planta.descricao + "\n"}</Text>
                  <Divider />
                  <Text style={styles.descricao}>{"\n\nComo plantar:\n" + planta.descricao_2 + "\n\n"}</Text>
                  <Image
                    source={planta.imagem2}
                    style={styles.img2}
                  />
                  <Text style={styles.descricao}>{"\n\nDica:\n\n" + planta.descricao_3}</Text>
                </ScrollView>
              </View>
            ))}

          </ScrollView>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal2Visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.container}>
          <ScrollView
            style={styles.plantasContainer}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {state.animais.map(animais => (
              <View key={animais.id} style={styles.planta}>
                <ScrollView>
                  <Button
                    onPress={() => {
                      setModal2Visible(!modal2Visible);
                    }}>
                    Sair
            </Button>
                  <Image
                    source={animais.imagem}
                    style={styles.img}
                  />
                  <Text style={styles.title}>{animais.title}</Text>
                  <Text>{"\n"}</Text>
                  <Divider />
                  <Text style={styles.dadosGerais}>{"\n" + animais.descricao + "\n"}</Text>
                  <Divider />
                  <Text style={styles.descricao}>{"\n\nComo cuidar:\n" + animais.descricao_2 + "\n\n"}</Text>
                  <Image
                    source={animais.imagem2}
                    style={styles.img2}
                  />
                  <Text style={styles.descricao}>{"\n\nDicas:\n\n" + animais.descricao_3}</Text>
                </ScrollView>
              </View>
            ))}

          </ScrollView>
        </View>
      </Modal>
      <ScrollView>
        <View style={{ height: 95, width: 377, alignItems: 'center' }}>
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID="ca-app-pub-9891647271376872/3398082789"/>
        </View>
        <Card>
        </Card>
        <View>

          <Card style={styles.previsao}>
            <Card.Title title="Tempo" subtitle={tempo["weather"][0]["description"]} />
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={{ uri: 'http://openweathermap.org/img/wn/' + tempo["weather"][0]["icon"] + '@2x.png' }}
                style={styles.img3}
              />
              <Title>{(tempo["main"]["temp"] - 273.15).toFixed(0) + "°C"}</Title>
            </View>
            <Card.Content>
              <Subheading >{tempo["name"]}</Subheading>
              <View style={{ flexDirection: 'row' }}>
                <Paragraph>Min: </Paragraph>
                <Caption>{(tempo["main"]["temp_min"] - 273.15).toFixed(0) + "°C"}</Caption>
                <Paragraph> Max: </Paragraph>
                <Caption>{(tempo["main"]["temp_max"] - 273.15).toFixed(0) + "°C"}</Caption>
              </View>
            </Card.Content>
          </Card>

        </View>
        <Divider />
        <Card>
          <Card.Title title="Plantação" subtitle="Cultivo de plantas" left={LeftContent} />
          <Card.Content>
            <Card.Cover source={require('./../../resources/Plantas/Plantas_inicio.jpg')} />
            <Paragraph>Veja aqui informações de como cultivar determinada planta e fique informado!</Paragraph>
          </Card.Content>

          <Card.Actions>
            <Button onPress={() => {
              setModalVisible(true);
            }}>Saiba mais...</Button >
          </Card.Actions>
        </Card>
        <Divider />
        <Card>
          <Card.Title title="Animais" subtitle="Dicas de cuidados para animais" left={LeftContent} />
          <Card.Content>
            <Card.Cover source={require('./../../resources/Plantas/Inicio_animais.jpg')} />
            <Paragraph>Veja aqui informações de como cuidar da sua criação!</Paragraph>
          </Card.Content>

          <Card.Actions>
            <Button 
            onPress={() => {
              setModal2Visible(true);
              
            }}>Saiba mais...</Button >
          </Card.Actions>
        </Card>
        <Divider />
        <Card>
          <Card.Title title="Agroflorestas" subtitle="Saiba mais sobre agro florestas" left={LeftContent} />
          <Card.Content>
          <Card.Cover source={require('./../../resources/Plantas/Agrofloresta_inicio.png')} />
            <Paragraph>Saiba tudo sobre agroflorestas e como elas podem te ajudar!</Paragraph>
          </Card.Content>

          <Card.Actions>
            <Button onPress={() => {
              setModal3Visible(true);
            }}>Saiba mais...</Button >
          </Card.Actions>
        </Card>
        <Divider />


      </ScrollView>
    </View>
  );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  previsao: {
    backgroundColor: "#caf1f1",
    borderRadius: 30,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },


  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 80,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  img: {

    padding: 20,
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: '#008080',
  },
  img2: {

    padding: 20,
    borderRadius: 10,
    width: 325,
    alignContent: "center",
    height: 200,
    marginVertical: 10,
    backgroundColor: '#008080',

  },
  img3: {

    padding: 20,
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  container: {
    backgroundColor: '#e4a8ff',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },

  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  plantasContainer: {
    width: '100%',
    maxHeight: 900,
  },

  planta: {
    width: width - 40,
    maxHeight: 900,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
    padding: 20,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  dadosGerais: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#007639',
    backgroundColor: 'transparent',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  descricao: {
    color: '#999',
    fontSize: 12,
    marginTop: 5,
  },
});
