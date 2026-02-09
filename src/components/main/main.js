import { useVehiclesStore } from "../../store/useVehiclesStore";
import "./main.scss";
import CarCard from "../carCard/carCard";
import { useRef, useState } from "react";

const Main = () => {
  const vehicles = useVehiclesStore((state) => state.vehicles);
  const addVehicle = useVehiclesStore((state) => state.addVehicle);

  const [editingCar, setEditingCar] = useState(null);
  const [addingNewCar, setAddingNewCar] = useState(false);

  const [newCar, setNewCar] = useState({
    name: "",
    model: "",
    year: "",
    color: "",
    price: "",
  });

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!newCar.name || !newCar.price) return;
    addVehicle(newCar);
    setNewCar({ name: "", model: "", year: "", color: "", price: "" });
  };

  const [sortType, setSortType] = useState("");

  const sortedVehicles = [...vehicles].sort((a, b) => {
    switch (sortType) {
      case "year-asc":
        return a.year - b.year;
      case "year-desc":
        return b.year - a.year;
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  function getYandexMapSrc(lat, lng, zoom = 16.4) {
    return `https://yandex.ru/map-widget/v1/?ll=${lng}%2C${lat}&mode=search&sll=${lat}%2C${lng}&text=${lat}%2C${lng}&z=${zoom}`;
  }

  // Использование
  const [lat, setLat] = useState(55.753668);
  const [lng, setLng] = useState(37.621226);
  const zoom = 16;

  const mapRef = useRef(null);

  const handleSelectCar = (vehicle) => {
    setLat(vehicle.latitude);
    setLng(vehicle.longitude);
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const src = getYandexMapSrc(lat, lng, zoom);

  return (
    <section className="main">
      <div className="container">
        <h2 className="main-title">Cars</h2>

        <div className="sort-controls">
          <label>Сортировать: </label>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Без сортировки</option>
            <option value="year-asc">Год ↑</option>
            <option value="year-desc">Год ↓</option>
            <option value="price-asc">Цена ↑</option>
            <option value="price-desc">Цена ↓</option>
          </select>
        </div>

        <div className="cars-list">
          {sortedVehicles.map((vehicle) => (
            <CarCard
              key={`${vehicle.name}-${vehicle.price}`}
              vehicle={vehicle}
              onSelect={handleSelectCar}
              isEditing={
                editingCar &&
                editingCar.name === vehicle.name &&
                Number(editingCar.price) === Number(vehicle.price)
              }
              startEdit={() =>
                setEditingCar({ name: vehicle.name, price: vehicle.price })
              }
              stopEdit={() => setEditingCar(null)}
            />
          ))}
        </div>
        {!addingNewCar && (
          <button onClick={() => setAddingNewCar(!addingNewCar)}>
            Добавить машину
          </button>
        )}
        {addingNewCar && (
          <div className="new-car-form">
            <input
              name="name"
              placeholder="Name"
              value={newCar.name}
              onChange={handleNewChange}
            />
            <input
              name="model"
              placeholder="Model"
              value={newCar.model}
              onChange={handleNewChange}
            />
            <input
              name="year"
              type="number"
              placeholder="Year"
              value={newCar.year}
              onChange={handleNewChange}
            />
            <input
              name="color"
              placeholder="Color"
              value={newCar.color}
              onChange={handleNewChange}
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={newCar.price}
              onChange={handleNewChange}
            />
            <div className="form-actions">
              <button onClick={handleAdd}>Добавить машину</button>
              <button onClick={() => setAddingNewCar(!addingNewCar)}>
                Закрыть
              </button>
            </div>
          </div>
        )}
        <iframe
          ref={mapRef}
          src={src}
          title="Yandex Map"
        />
      </div>
    </section>
  );
};

export default Main;
