import { SafeAreaView, ScrollView, StyleSheet, Text, FlatList, View } from 'react-native';
import ButtonIcon from '../components/ButtonIcon';



const AboutScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>

                <Text style={styles.title}>Les règles de la communauté </Text>

                <Text style={styles.baseText}>
                    Iconic Travel reflète nos diverses communautés en matière de culture, de religion et d’âge. Afin de créer un environnement sûr et ouvert pour chacun, nous avons consacré du temps à réfléchir aux différents points de vue.
                </Text>

                <Text style={styles.onePart}>
                    Nous avons créé les Règles de la communauté afin que vous puissiez nous aider dans la création et la protection de cette remarquable Iconic Community. En utilisant l’application Iconic Travel, vous acceptez de suivre les règles et nos Conditions d’utilisation. Nous nous engageons à suivre ces règles et espérons que vous en faites autant. La transgression de ces règles peut entraîner la suppression de contenu, la désactivation de comptes ou d’autres restrictions.
                </Text>

                <Text style={styles.titleTwoPart}>
                    Le partage de contenu :
                </Text>
                <Text style={styles.twoPart}>
                    Le contenu que vous publiez sur Iconic Travel vous appartient. Nous tenons à ce que notre communauté soit authentique et nous vous en demandons de même concernant votre contenu. Ne publiez aucun contenu que vous avez copié ou obtenu sur Internet et sur lequel vous ne disposez pas de droits de publication.
                </Text>

                <Text style={styles.titleThreePart}>
                    Respectez les autres membres de la Iconic Community :
                </Text>
                <Text style={styles.threePart}>
                    Nous souhaitons une communauté positive et diversifiée. Nous prendrons le temps de supprimer tout contenu qui comporte des menaces ou des discours haineux, tout contenu qui vise des personnes privées dans le but de les humilier ou de les déshonorer, les informations personnelles à des fins de chantage ou de harcèlement, ainsi que les contenus indésirables répétitifs. Il n’est jamais correct d’encourager la violence ou d’attaquer quiconque sur la base de la race, l’ethnicité, la nationalité, le sexe, le genre, l’identité sexuelle, l’affiliation religieuse, le handicap ou l’état pathologique. Les menaces sérieuses d’atteintes à la sécurité publique et personnelle sont interdites. Cela inclut aussi bien les menaces précises de violence physique que les menaces de vol, de vandalisme et de tout autre préjudice financier. Nous examinons attentivement les signalements de menaces et prenons en compte un grand nombre d’éléments afin de déterminer si une menace est réelle.
                </Text>

                <Text style={styles.titleFourPart}>
                    Aidez-nous à maintenir l’intégrité de la communauté:
                </Text>

                <Text style={styles.fourPart}>
                    <View style={{ padding: 20}}>
                        <FlatList
                            data={[
                                { key: 'Chacun d’entre vous est impliqué dans la Iconic Community. Si vous voyez un contenu qui semble enfreindre nos règles, n’hésitez pas à nous le signaler.' },
                                { key: 'Il est possible que vous trouviez un contenu que vous n’aimez pas, mais qui respecte les Règles de la communauté. Si tel est le cas, vous pouvez vous désinscrire.' },
                                { key: 'De nombreux conflits et malentendus peuvent être réglés directement entre les membres de la communauté. Si une personne a publié une de vos photos ou vidéos, vous pouvez essayer de rentrer en contact pour lui demander de la retirer. Si cela ne fonctionne pas, vous pouvez envoyer un signalement relatif aux droits d’auteur.' },
                                { key: 'Nous pouvons être amenés à collaborer avec les autorités, notamment lorsqu’il existe un risque de préjudice physique ou d’atteinte à la sécurité publique.' },
                            ]}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ marginBottom: 10}}>
                                        <Text style={{ fontSize: 15, textAlign: 'justify', justifyContent: 'center' }}>{`\u2022 ${item.key}`}</Text>
                                    </View>
                                );
                            }}
                        />

                        <Text style={styles.fivePart}>
                            Nous vous remercions de votre participation à la création de l’une des meilleures communautés du monde.
                            L’équipe Iconic Travel
                        </Text>

                    </View>
                </Text>

                <ButtonIcon
                    type="secondary"
                    name="arrow-undo-outline"
                    onpress={() => navigation.navigate('ProfileStepFour')}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },

    scrollView: {
        marginHorizontal: 20,
    },

    title: {
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        paddingTop: 20,
        paddingBottom: 20,
        // fontFamily:'Montserrat',
    },

    baseText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'justify',
    },

    onePart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'justify',
        paddingTop: 10,
        paddingBottom: 10,
    },

    titleTwoPart: {
        fontWeight: 'bold',
    },

    twoPart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'justify',
        paddingBottom: 10,
    },

    titleThreePart: {
        fontWeight: 'bold',
    },

    threePart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'justify',
        paddingBottom: 10,
    },

    titleFourPart: {
        fontWeight: 'bold',
    },

    fourPart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'justify',
        paddingBottom: 5,
    },

    fivePart: {
        textAlign: 'justify',
    },
});

export default AboutScreen;