import React from 'react';
import './form.module.css'
import "react-datepicker/dist/react-datepicker.css";

const Lang = ({setItemLang, setDelAgree, setCategories, setLang, setNameLang}) => {


    return (
        <div className='full-form lang'>
            <div onClick={e => e.stopPropagation()}>
                <div id="login-box lang-box">
                    <div>
                        {/*<h1 style={{width: '100%', textAlign: 'center'}}><b>Bienvenida</b></h1>*/}
                        <div style={{display: 'flex'}}>
                            <div className='lang-left' style={{width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginRight: '5px'}}>
                                <button className="custom-btn btn-16" onClick={() => {setItemLang('español'); setNameLang(['Búsqueda 🔎', 'Encara no hi ha res a la teva cistella de compra 😞', 'Anar a la cistella de compra 🛒', 'Disponible avui', 'Disponible en els proxims', 'dies', 'Confirmar la comanda:', 'Numero de telefon movil', 'La direccio', 'El comentari', 'Informacio de contacte', 'Requisits numero de telefon y la teva direccio.', 'Trieu data i hora de lliurament', '🎅🏻 Només per a 29-31 des', 'Introdueix el mètode de pagament', 'Contra reemborsament en efectiu', 'Datafono, al lliurament', 'M\'agradaria pagar en línia', 'Quant haurà de ser el canvi?']); setLang(false); setDelAgree(`Gràcies per la seva elecció!

Les nostres CONDICIONS D'ENVIAMENT:

*Demanat min per al lliurament gratis - 29€ després de tenir en compte tots els descomptes*

* DIAS de lliurament: Dilluns-Sabat*

El temps de lliurament també depèn de la marca de verificació verda o groga al costat de l' article.

*DISPONIBLE AVUI* (verd) - la seua comanda pot ser entregada el mateix dia després de les 15:00 hores si es realitza *abans de les 10:00* hores.

Després de les 10. 00 - lliurament automàtic l'endemà

DISPONIBLE DINS DE "x" DIES: si hi ha almenys un producte al carretó amb una marca groga, presti atenció a la quantitat de dies que s'especifica: però màxim 72 hores des del moment de la comanda

Marcats amb 🎅🏻 - per als productes s'accepten comandes per al Nou Any
- enviar fins a les 22:00 el 27. 12. 22
- lliurament 29/30/31 desembre

* Per a lliuraments els dies dissabte, la comanda s' ha de realitzar el divendres abans de les 10: 00*
En els comentaris *aquí (http://t. me/TPOfather)*, pot deixar les seues peticions d'entrega, també corregir l'hora i el lloc.`); setCategories([
                                    {
                                        key: 'Gourmet',
                                        name: "Gourmet",
                                        title: 'Gourmet',
                                        img: './catImg/dc.svg'
                                    },
                                    {
                                        key: 'Bebidas y Zumos',
                                        name: 'Bebidas y Zumos',
                                        title: 'Begudes i Sucs',
                                        img: './catImg/napK.svg'
                                    },
                                    {
                                        key: 'Despensa',
                                        name: "Despensa",
                                        title: 'Rebost ',
                                        img: './catImg/kladS.svg'
                                    },
                                    {
                                        key: 'Dulces',
                                        name: "Dulces",
                                        title: 'Dolços',
                                        img: './catImg/sweetK.svg'
                                    },
                                    {
                                        key: 'Embutidos y jamones',
                                        name: "Embutidos y jamones",
                                        title: 'Embotits i pernils',
                                        img: './catImg/kolbS.svg'
                                    },
                                    {
                                        key: 'Frutas, Verduras, Hierbas',
                                        name: 'Frutas, Verduras, Hierbas',
                                        title: 'Fruites, Verdures, Herbes',
                                        img: './catImg/frutsK.svg'
                                    },
                                    {
                                        key: 'Frutos Secos',
                                        name: 'Frutos Secos',
                                        title: 'Fruits secs',
                                        img: './catImg/opexS.svg'
                                    },
                                    {
                                        key: 'Lácteos y quesos',
                                        name: "Lácteos y quesos",
                                        title: 'Lactis i formatges',
                                        img: './catImg/moloK.svg'
                                    },
                                    {
                                        key: 'Productos del mar',
                                        name: "Productos del mar",
                                        title: 'Productes del Mar',
                                        img: './catImg/moreS.svg'
                                    },
                                    {
                                        key: 'Cavas y licores',
                                        name: "Cavas y licores",
                                        title: 'Caves i licors',
                                        img: './catImg/vinoK.svg'
                                    },
                                ])}}>CAT</button>
                                <button className="custom-btn btn-16" onClick={() => {setItemLang('español'); setNameLang(['Search 🔎', 'There is still nothing in your cart 😞', 'Go to cart 🛒', 'Available Today', 'Available in', 'days', 'Confirm you order:', 'Your phone number', 'Your address', 'Comment o suggestion', 'Contact information', 'Phone number and address are required.', 'Choose date and time of delivery', '🎅🏻 Only for Dec 29-31', 'Enter the payment method', 'In cash to the driver', 'With the dataphone', 'I want to pay online', 'How much will the change need to be?']); setLang(false); setDelAgree(`Thank you for your choice!

Our SHIPPING CONDITIONS:

*Min order for free delivery - 29€ after taking into account all discounts*

*DAYS of delivery: Monday-Saturday*

Delivery time also depends on the green or yellow check mark next to the item.

*AVAILABLE TODAY* (green) - your order can be delivered the same day after 3:00 pm if placed *before 10:00* am.

After 10. 00 a. m. - automatic next day delivery

AVAILABLE WITHIN "x" DAYS: if there is at least one product in the cart with a yellow check mark, pay attention to the number of days specified: but maximum 72 hours from the time of order

Marked with 🎅🏻- for these products orders are accepted for the New Year
- send until 22:00 on 27. 12. 22
- delivery december 29/30/31

*For Saturday deliveries, the order must be placed on Friday before 10:00 a. m. * For Saturday deliveries, the order must be placed on Friday before 10:00 a. m. *
In the comments *here (http://t. me/TPOfather)*, you can leave your delivery requests, also correct the time and location.`); setCategories([
                                    {
                                        key: 'Gourmet',
                                        name: "Gourmet",
                                        title: 'Gourmet',
                                        img: './catImg/dc.svg'
                                    },
                                    {
                                        key: 'Bebidas y Zumos',
                                        name: 'Bebidas y Zumos',
                                        title: 'Beverages and Juices',
                                        img: './catImg/napK.svg'
                                    },
                                    {
                                        key: 'Despensa',
                                        name: "Despensa",
                                        title: 'Pantry',
                                        img: './catImg/kladS.svg'
                                    },
                                    {
                                        key: 'Dulces',
                                        name: "Dulces",
                                        title: 'Sweets',
                                        img: './catImg/sweetK.svg'
                                    },
                                    {
                                        key: 'Embutidos y jamones',
                                        name: "Embutidos y jamones",
                                        title: 'Sausages and Hams',
                                        img: './catImg/kolbS.svg'
                                    },
                                    {
                                        key: 'Frutas, Verduras, Hierbas',
                                        name: 'Frutería',
                                        title: 'Fruits, Vegetables, Herbs',
                                        img: './catImg/frutsK.svg'
                                    },
                                    {
                                        key: 'Frutos Secos',
                                        name: 'Frutos Secos',
                                        title: 'Dried fruits',
                                        img: './catImg/opexS.svg'
                                    },
                                    {
                                        key: 'Lácteos y quesos',
                                        name: "Lácteos y quesos",
                                        title: 'Dairy products and cheeses',
                                        img: './catImg/moloK.svg'
                                    },
                                    {
                                        key: 'Productos del mar',
                                        name: "Productos del mar",
                                        title: 'Seafood Products',
                                        img: './catImg/moreS.svg'
                                    },
                                    {
                                        key: 'Cavas y licores',
                                        name: "Licores y Cavas",
                                        title: 'Sparkling wine and Spirits',
                                        img: './catImg/vinoK.svg'
                                    },
                                ])}}>EN</button>
                                <button className="custom-btn btn-16" onClick={() => {setItemLang('español');setNameLang(['Căutare 🔎', 'De moment nu ai nimic în coșul tău 😞', 'Mergem la coș 🛒', 'Disponibil astăzi', 'Disponibil în', 'zile', 'Confirma comanda:', 'Numarul de telefon', 'Adresa', 'Comentariu sau sugestie', 'Informatii de contact', 'Numărul de telefon și adresa sunt necesare.', 'Alegeți data și ora livrării', '🎅🏻 Doar în perioada 29-31 dec', 'Introduceți metoda de plată', 'In numerar  la livrare', 'Cu datafon, la livrare', 'Aș dori sa platesc online', 'Cât va trebui să fie schimbul?']); setLang(false); setDelAgree(`Thank you for your choice!

Our SHIPPING CONDITIONS:

*Min order for free delivery - 29€ after taking into account all discounts*

*DAYS of delivery: Monday-Saturday*

Delivery time also depends on the green or yellow check mark next to the item.

*AVAILABLE TODAY* (green) - your order can be delivered the same day after 3:00 pm if placed *before 10:00* am.

After 10. 00 a. m. - automatic next day delivery

AVAILABLE WITHIN "x" DAYS: if there is at least one product in the cart with a yellow check mark, pay attention to the number of days specified: but maximum 72 hours from the time of order

Marked with 🎅🏻- for these products orders are accepted for the New Year
- send until 22:00 on 27. 12. 22
- delivery december 29/30/31

*For Saturday deliveries, the order must be placed on Friday before 10:00 a. m. * For Saturday deliveries, the order must be placed on Friday before 10:00 a. m. *
In the comments *here (http://t. me/TPOfather)*, you can leave your delivery requests, also correct the time and location.`); setCategories([
                                    {
                                        key: 'Gourmet',
                                        name: "Gourmet",
                                        title: 'Gourmet',
                                        img: './catImg/dc.svg'
                                    },
                                    {
                                        key: 'Bebidas y Zumos',
                                        name: 'Bebidas y Zumos',
                                        title: 'Băuturi și sucuri',
                                        img: './catImg/napK.svg'
                                    },
                                    {
                                        key: 'Despensa',
                                        name: "Despensa",
                                        title: 'Cămară',
                                        img: './catImg/kladS.svg'
                                    },
                                    {
                                        key: 'Dulces',
                                        name: "Dulces",
                                        title: 'Dulce',
                                        img: './catImg/sweetK.svg'
                                    },
                                    {
                                        key: 'Embutidos y jamones',
                                        name: "Embutidos y jamones",
                                        title: 'Cârnați și șunci',
                                        img: './catImg/kolbS.svg'
                                    },
                                    {
                                        key: 'Frutas, Verduras, Hierbas',
                                        name: 'Frutería',
                                        title: 'Fructe, Legume, Ierburi',
                                        img: './catImg/frutsK.svg'
                                    },
                                    {
                                        key: 'Frutos Secos',
                                        name: 'Frutos Secos',
                                        title: 'Nuci',
                                        img: './catImg/opexS.svg'
                                    },
                                    {
                                        key: 'Lácteos y quesos',
                                        name: "Lácteos y quesos",
                                        title: 'Lactate și brânză',
                                        img: './catImg/moloK.svg'
                                    },
                                    {
                                        key: 'Productos del mar',
                                        name: "Productos del mar",
                                        title: 'Produse marine',
                                        img: './catImg/moreS.svg'
                                    },
                                    {
                                        key: 'Cavas y licores',
                                        name: "Licores y Cavas",
                                        title: 'Cave și lichioruri',
                                        img: './catImg/vinoK.svg'
                                    },
                                ])}}>RO</button>
                                <button className="custom-btn btn-16" onClick={() => {setItemLang('español');setNameLang(['Recherche 🔎', 'Vous n\'avez rien encore dans votre panier 😞', 'Voir mon panier 🛒', 'Disponible aujourd\'hui', 'Disponible dans', 'jours', 'Confirmer ma commande:', 'Numéro de téléphone', 'L\'adresse', 'Le commentaire', 'Information de contact', 'Numéro de téléphone et adresse requis.', 'Choisissez la date et l\'heure de livraison', '🎅🏻 Uniquement du 29 au 31 déc', 'Entrez le mode de paiement', 'Paiement à la livraison', 'Dataphone, à la livraison', 'Je souhaite payer en ligne', 'De combien le changement devra-t-il être?']); setLang(false); setDelAgree(`Merci de votre choix !

Nos CONDITIONS D'EXPÉDITION :

*Commande minimale pour la livraison gratuite - 29 € après prise en compte de toutes les remises*

*JOURS de livraison : lundi-samedi*

Le délai de livraison dépend également de la coche verte ou jaune figurant à côté de l'article.

*DISPONIBLE AUJOURD'HUI* (vert) - votre commande peut être livrée le jour même après 15h00 si elle est passée *avant 10h00*.

Après 10h00 - livraison automatique le jour suivant

DISPONIBLE DANS LES "x" JOURS : s'il y a au moins un produit dans le panier avec une marque jaune, faites attention au nombre de jours spécifiés : mais au maximum 72 heures à partir du moment de la commande

Marqué avec 🎅🏻- pour ces produits les commandes sont acceptées pour la nouvelle année
- envoi jusqu'à 22:00 le 27. 12. 22
- livraison 29/30/31 décembre

*Pour les livraisons le samedi, la commande doit être passée le vendredi avant 10h00*
Dans les commentaires *ici (http://t. me/TPOfather)*, vous pouvez laisser vos demandes de livraison, corriger également l'heure et le lieu.
`); setCategories([
                                    {
                                        key: 'Gourmet',
                                        name: "Gourmet",
                                        title: 'Gourmet',
                                        img: './catImg/dc.svg'
                                    },
                                    {
                                        key: 'Bebidas y Zumos',
                                        name: 'Bebidas y Zumos',
                                        title: 'Boissons et jus de fruit',
                                        img: './catImg/napK.svg'
                                    },
                                    {
                                        key: 'Despensa',
                                        name: "Despensa",
                                        title: 'Garde-manger',
                                        img: './catImg/kladS.svg'
                                    },
                                    {
                                        key: 'Dulces',
                                        name: "Dulces",
                                        title: 'Bonbons',
                                        img: './catImg/sweetK.svg'
                                    },
                                    {
                                        key: 'Embutidos y jamones',
                                        name: "Embutidos y jamones",
                                        title: 'Saucisses et Jambons ',
                                        img: './catImg/kolbS.svg'
                                    },
                                    {
                                        key: 'Frutas, Verduras, Hierbas',
                                        name: 'Frutería',
                                        title: 'Fruits, Légumes et Herbes aromatiques',
                                        img: './catImg/frutsK.svg'
                                    },
                                    {
                                        key: 'Frutos Secos',
                                        name: 'Frutos Secos',
                                        title: 'Fruits secs',
                                        img: './catImg/opexS.svg'
                                    },
                                    {
                                        key: 'Lácteos y quesos',
                                        name: "Lácteos y quesos",
                                        title: 'Produits laitiers et Fromages',
                                        img: './catImg/moloK.svg'
                                    },
                                    {
                                        key: 'Productos del mar',
                                        name: "Productos del mar",
                                        title: 'Produits de la mer',
                                        img: './catImg/moreS.svg'
                                    },
                                    {
                                        key: 'Cavas y licores',
                                        name: "Licores y Cavas",
                                        title: 'Mousseux et Liqueu',
                                        img: './catImg/vinoK.svg'
                                    },
                                ])}}>FR</button>
                            </div>
                            <div className='lang-left' style={{width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                <button className="custom-btn btn-16" onClick={() => {setItemLang('español');setNameLang(['Búsqueda 🔎', 'Todavía no hay nada en tu carrito 😞', 'Ir al carrito 🛒', 'Disponible hoy', 'Disponible dentro de', 'días', 'Confirmar el pedido:', 'Número de móvil', 'La Dirección', 'El Comentario', 'Información de contacto', 'Número de teléfono y dirección requeridos.', 'Elige la fecha y hora de la entrega', '🎅🏻 Solo para 29-31 dic', 'Introduce el método de pago', 'Contra reembolso en efectivo', 'Datafono, a la entrega', 'Me gustaría pagar en linea', '¿Cuánto cambio se requerirá?']); setLang(false); setDelAgree(`¡Gracias por su elección!

Nuestras CONDICIONES DE ENVÍO:

*Pedido min para la entrega gratis - 29€ después de tener en cuenta todos los descuentos*

*DIAS de entrega: Lunes-Sabado*

El tiempo de entrega también depende de la marca de verificación verde o amarilla al lado del artículo.

*DISPONIBLE HOY* (verde) - su pedido puede ser entregado el mismo día después de las 15:00 horas si se realiza *antes de las 10:00* horas.

Después de las 10.00 - entrega automática al día siguiente

DISPONIBLE DENTRO DE “x” DÍAS: si hay al menos un producto en el carrito con una marca amarilla, preste atención a la cantidad de días que se especifica: pero máximo 72 horas desde el momento del pedido

Marcados con 🎅🏻- para estés productos se aceptan pedidos para el Nuevo Año 
- enviar hasta las 22:00 el 27.12.22 
- entrega 29/30/31 diciembre 

*Para entregas los días sábado, el pedido debe realizarse el viernes antes de las 10:00*

En los comentarios *aquí (http://t.me/TPOfather)*, puede dejar sus peticiones de entrega, también corregir la hora y el lugar`); setCategories([
                                    {
                                        key: 'Gourmet',
                                        name: "Gourmet",
                                        title: 'Gourmet',
                                        img: './catImg/dc.svg'
                                    },
                                    {
                                        key: 'Bebidas y Zumos',
                                        name: 'Bebidas y Zumos',
                                        title: 'Bebidas y Zumos',
                                        img: './catImg/napK.svg'
                                    },
                                    {
                                        key: 'Despensa',
                                        name: "Despensa",
                                        title: 'Despensa',
                                        img: './catImg/kladS.svg'
                                    },
                                    {
                                        key: 'Dulces',
                                        name: "Dulces",
                                        title: 'Dulces',
                                        img: './catImg/sweetK.svg'
                                    },
                                    {
                                        key: 'Embutidos y jamones',
                                        name: "Embutidos y jamones",
                                        title: 'Embutidos y jamones',
                                        img: './catImg/kolbS.svg'
                                    },
                                    {
                                        key: 'Frutas, Verduras, Hierbas',
                                        name: 'Frutas, Verduras, Hierbas',
                                        title: 'Frutas, Verduras, Hierbas',
                                        img: './catImg/frutsK.svg'
                                    },
                                    {
                                        key: 'Frutos Secos',
                                        name: 'Frutos Secos',
                                        title: 'Frutos secos',
                                        img: './catImg/opexS.svg'
                                    },
                                    {
                                        key: 'Lácteos y quesos',
                                        name: "Lácteos y quesos",
                                        title: 'Lácteos y quesos',
                                        img: './catImg/moloK.svg'
                                    },
                                    {
                                        key: 'Productos del mar',
                                        name: "Productos del mar",
                                        title: 'Productos del mar',
                                        img: './catImg/moreS.svg'
                                    },
                                    {
                                        key: 'Cavas y licores',
                                        name: "Cavas y licores",
                                        title: 'Cavas y licores',
                                        img: './catImg/vinoK.svg'
                                    },
                                ])}}>ES</button>
                                <button className="custom-btn btn-16" onClick={() => {setItemLang('ucranian');setNameLang(['Пошук 🔎', 'Ваш кошик на даний момент порожній 😞', 'Перейти до вашого кошику 🛒', 'Доступно сьгодні', 'Доступно протягом', 'днів', 'Оформити замовлення:', 'Номер телефону', 'Адреса', 'Коментар', 'Контактна інформація', 'Необхідно вказати номер телефону та адресу доставки.', 'Вибери дату та час доставки', '🎅🏻 Тільки 29-31 гр', 'Введіть спосіб оплати', 'Готівкою при доставці', 'Терміналом, при доставці', 'Я хотів би оплатити онлайн', 'З якої суми потрібна буде здавання?']); setLang(false); setDelAgree(`Thank you for your choice!

Our SHIPPING CONDITIONS:

*Min order for free delivery - 29€ after taking into account all discounts*

*DAYS of delivery: Monday-Saturday*

Delivery time also depends on the green or yellow check mark next to the item.

*AVAILABLE TODAY* (green) - your order can be delivered the same day after 3:00 pm if placed *before 10:00* am.

After 10. 00 a. m. - automatic next day delivery

AVAILABLE WITHIN "x" DAYS: if there is at least one product in the cart with a yellow check mark, pay attention to the number of days specified: but maximum 72 hours from the time of order

Marked with 🎅🏻- for these products orders are accepted for the New Year
- send until 22:00 on 27. 12. 22
- delivery december 29/30/31

*For Saturday deliveries, the order must be placed on Friday before 10:00 a. m. * For Saturday deliveries, the order must be placed on Friday before 10:00 a. m. *
In the comments *here (http://t. me/TPOfather)*, you can leave your delivery requests, also correct the time and location.`); setCategories([
                                    {
                                        key: 'Gourmet',
                                        name: "Gourmet",
                                        title: 'Делікатесы',
                                        img: './catImg/dc.svg'
                                    },
                                    {
                                        key: 'Bebidas y Zumos',
                                        name: 'Bebidas y Zumos',
                                        title: 'Напої та соки',
                                        img: './catImg/napK.svg'
                                    },
                                    {
                                        key: 'Despensa',
                                        name: "Despensa",
                                        title: 'Комора',
                                        img: './catImg/kladS.svg'
                                    },
                                    {
                                        key: 'Dulces',
                                        name: "Dulces",
                                        title: 'Солодощі',
                                        img: './catImg/sweetK.svg'
                                    },
                                    {
                                        key: 'Embutidos y jamones',
                                        name: "Embutidos y jamones",
                                        title: 'Ковбасні вироби та хамон',
                                        img: './catImg/kolbS.svg'
                                    },
                                    {
                                        key: 'Frutas, Verduras, Hierbas',
                                        name: 'Frutería',
                                        title: 'Фрукти та овочі',
                                        img: './catImg/frutsK.svg'
                                    },
                                    {
                                        key: 'Frutos Secos',
                                        name: 'Frutos Secos',
                                        title: 'Сухофрукти',
                                        img: './catImg/opexS.svg'
                                    },
                                    {
                                        key: 'Lácteos y quesos',
                                        name: "Lácteos y quesos",
                                        title: 'Сири та молочна продукція',
                                        img: './catImg/moloK.svg'
                                    },
                                    {
                                        key: 'Productos del mar',
                                        name: "Productos del mar",
                                        title: 'Морепродукти',
                                        img: './catImg/moreS.svg'
                                    },
                                    {
                                        key: 'Cavas y licores',
                                        name: "Licores y Cavas",
                                        title: 'Вина та кави',
                                        img: './catImg/vinoK.svg'
                                    },
                                ])}}>UA</button>
                                <button className="custom-btn btn-16" onClick={() => {setItemLang('russian');setNameLang(['Поиск 🔎', 'В вашей корзине пока ничего нет 😞', 'Перейти к корзине 🛒', 'Доступно сегодня', 'Возможно в течении', 'дней', 'Оформить заказ:', 'Номер телефона', 'Адрес', 'Комментарий', 'Контактная информация', 'Необходимо указать номер телефона и адрес.', 'Выберите дату и время доставки', '🎅🏻 Только на 29-31 дек', 'Введите способ оплаты', 'Наличными, при доставке', 'Терминалом, при доставке', 'Я хотел бы оплатить онлайн', 'С какой суммы нужна будет сдача?']); setLang(false); setDelAgree(`Спасибо за ваш выбор!

Наши УСЛОВИЯ ДОСТАВКИ:

Мин. заказ - 29€ после учета всех скидок

ДНИ доставки: ПН-СБ

Время вашей доставки также зависит от зелёной или жёлтой галочки напротив товара

ДОСТУПНО СЕГОДНЯ (зелёным) - доставка вашего заказа возможна в этот же день после 15,  если он будет сделан до 10:00 утра.
После 10.00 - доставка автоматически на следующий день

ДОСТУПНО В ТЕЧЕНИИ х ДНЕЙ - если хоть один товар в корзине с желтой маркировкой, ориентироваться на указанное количество дней -  макс 72 часа с момента заказа

🎄- заказы принимаются на новый год (до 27.12.22 до 22.00)

Для доставки в субботу, заказ должен быть сделан в пятницу до 10:00

В комментариях здесь, вы  можете оставить ваши пожелания по доставке, также скоректировать время и место 
 

Заказы в воскресенье -  по умолчанию планируются на Понедельник
`); setCategories([
                                    {
                                        key: 'Gourmet',
                                        name: "Gourmet",
                                        title: 'Деликатесы',
                                        img: './catImg/dc.svg'
                                    },
                                    {
                                        key: 'Bebidas y Zumos',
                                        name: 'Bebidas y Zumos',
                                        title: 'Напитки, Соки',
                                        img: './catImg/napK.svg'
                                    },
                                    {
                                        key: 'Despensa',
                                        name: "Despensa",
                                        title: 'Кладовая',
                                        img: './catImg/kladS.svg'
                                    },
                                    {
                                        key: 'Dulces',
                                        name: "Dulces",
                                        title: 'Сладости',
                                        img: './catImg/sweetK.svg'
                                    },
                                    {
                                        key: 'Embutidos y jamones',
                                        name: "Embutidos y jamones",
                                        title: 'Колбасы и Хамон',
                                        img: './catImg/kolbS.svg'
                                    },
                                    {
                                        key: 'Frutas, Verduras, Hierbas',
                                        name: 'Frutería',
                                        title: 'Фрукты, Овощи',
                                        img: './catImg/frutsK.svg'
                                    },
                                    {
                                        key: 'Frutos Secos',
                                        name: 'Frutos Secos',
                                        title: 'Сухофрукты',
                                        img: './catImg/opexS.svg'
                                    },
                                    {
                                        key: 'Lácteos y quesos',
                                        name: "Lácteos y quesos",
                                        title: 'Сыры и Молочка',
                                        img: './catImg/moloK.svg'
                                    },
                                    {
                                        key: 'Productos del mar',
                                        name: "Productos del mar",
                                        title: 'Морепродукты',
                                        img: './catImg/moreS.svg'
                                    },
                                    {
                                        key: 'Cavas y licores',
                                        name: "Licores y Cavas",
                                        title: 'Вина и Шампанские',
                                        img: './catImg/vinoK.svg'
                                    },
                                ])}}>RU</button>
                                <button className="custom-btn btn-16" onClick={() => {setItemLang('español');setNameLang(['Ricerca 🔎', 'Non c’è ancora nulla nel tuo carrello 😞', 'Vai al carrello 🛒', 'Oggi Disponibile', 'Disponibile in', 'giorni', 'Conferma l’ordine:', 'Número di teléfono', 'Indirizzo', 'Commento', 'Informazioni di contatto', 'Numero di teléfono e indirizzo richiesto.', 'Scegli data e ora di consegna', '🎅🏻 Solo per il 29-31 dic', 'Inserisci il metodo di pagamento', 'Pagamento alla consegna', 'Pagamento  con POSS', 'Vorrei pagare online', 'Dicci il cambio da preparare per il resto']); setLang(false); setDelAgree(`Grazie per la vostra scelta!

Le nostre CONDIZIONI DI SPEDIZIONE:

*Ordine minimo per la consegna gratuita - 29 € dopo aver tenuto conto di tutti gli sconti*

*Giorni di consegna: lunedì-sabato*

Il tempo di consegna dipende anche dal segno di spunta verde o giallo accanto all'articolo.

*DISPONIBILE OGGI* (verde) - l'ordine può essere consegnato il giorno stesso dopo le ore 15:00 se effettuato *prima delle ore 10:00*.

Dopo le 10. 00 - consegna automatica il giorno successivo

DISPONIBILE ENTRO "x" GIORNI: se nel carrello è presente almeno un prodotto con un contrassegno giallo, prestare attenzione al numero di giorni specificato: ma al massimo 72 ore dal momento dell'ordine

Contrassegnato con 🎅🏻- per questi prodotti si accettano ordini per il nuovo anno
- inviare fino alle 22:00 del 27. 12. 22
- consegna 29/30/31 dicembre

*Per le consegne di sabato, l'ordine deve essere effettuato il venerdì prima delle 10:00*
Nei commenti *qui (http://t. me/TPOfather)*, potete lasciare le vostre richieste di consegna, correggendo anche l'ora e il luogo.`); setCategories([
                                    {
                                        key: 'Gourmet',
                                        name: "Gourmet",
                                        title: 'Gourmet',
                                        img: './catImg/dc.svg'
                                    },
                                    {
                                        key: 'Bebidas y Zumos',
                                        name: 'Bebidas y Zumos',
                                        title: 'Bibite e succhi',
                                        img: './catImg/napK.svg'
                                    },
                                    {
                                        key: 'Despensa',
                                        name: "Despensa",
                                        title: 'Dispensa',
                                        img: './catImg/kladS.svg'
                                    },
                                    {
                                        key: 'Dulces',
                                        name: "Dulces",
                                        title: 'Dolci',
                                        img: './catImg/sweetK.svg'
                                    },
                                    {
                                        key: 'Embutidos y jamones',
                                        name: "Embutidos y jamones",
                                        title: 'Salsicce e Prosciutti',
                                        img: './catImg/kolbS.svg'
                                    },
                                    {
                                        key: 'Frutas, Verduras, Hierbas',
                                        name: 'Frutas, Verduras, Hierbas',
                                        title: 'Frutta, Verdura, Erbe Aromatiche',
                                        img: './catImg/frutsK.svg'
                                    },
                                    {
                                        key: 'Frutos Secos',
                                        name: 'Frutos Secos',
                                        title: 'Frutti secchi',
                                        img: './catImg/opexS.svg'
                                    },
                                    {
                                        key: 'Lácteos y quesos',
                                        name: "Lácteos y quesos",
                                        title: 'Latticini e Formaggi',
                                        img: './catImg/moloK.svg'
                                    },
                                    {
                                        key: 'Productos del mar',
                                        name: "Productos del mar",
                                        title: 'Prodotti del mare',
                                        img: './catImg/moreS.svg'
                                    },
                                    {
                                        key: 'Cavas y licores',
                                        name: "Licores y Cavas",
                                        title: 'Spumante e Liquori',
                                        img: './catImg/vinoK.svg'
                                    },
                                ])}}>IT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lang;