function StarRating ({fontSize}) {
  return (
    <div className="d-flex ali-center">
      <ion-icon style={{fill: "gold", fontSize: fontSize}} name="star"></ion-icon>
      <ion-icon style={{fill: "gold", fontSize: fontSize}} name="star"></ion-icon>
      <ion-icon style={{fill: "gold", fontSize: fontSize}} name="star"></ion-icon>
      <ion-icon style={{fill: "gold", fontSize: fontSize}} name="star"></ion-icon>
      <ion-icon style={{fill: "gold", fontSize: fontSize}} name="star-half"></ion-icon>
    </div>
  );
};

export default StarRating;
