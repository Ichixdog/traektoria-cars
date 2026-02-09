import { useState, useEffect } from "react";
import { useVehiclesStore } from "../../store/useVehiclesStore";
import "./carCard.scss"

const CarCard = ({ vehicle, isEditing, startEdit, stopEdit, onSelect }) => {
  const updateVehicle = useVehiclesStore(state => state.updateVehicle);
  const removeVehicle = useVehiclesStore(state => state.removeVehicle);

  const [form, setForm] = useState({ ...vehicle });

  useEffect(() => {
    setForm({ ...vehicle });
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateVehicle(vehicle.name, vehicle.price, form);
    stopEdit();
  };

  const handleCancel = () => {
    setForm({ ...vehicle });
    stopEdit();
  };

  return (
    <div className="car-card">
      {isEditing ? (
        <div className="edit-mode">
          <input name="name" value={form.name} onChange={handleChange} />
          <input name="model" value={form.model} onChange={handleChange} />
          <input name="year" type="number" value={form.year} onChange={handleChange} />
          <input name="color" value={form.color} onChange={handleChange} />
          <input name="price" type="number" value={form.price} onChange={handleChange} />

          <button onClick={handleSave}>Сохранить</button>
          <button onClick={handleCancel}>Отменить</button>
        </div>
      ) : (
        <div className="view-mode">
          <div>Name: {vehicle.name}</div>
          <div>Model: {vehicle.model}</div>
          <div>Year: {vehicle.year}</div>
          <div>Color: {vehicle.color}</div>
          <div>Price: {vehicle.price}</div>

          <div className="main-actions">
            <button onClick={startEdit}>Редактировать</button>
            <button onClick={() => removeVehicle(vehicle.id)}>Удалить</button>
          </div>
          <button onClick={() => onSelect(vehicle)}>Показать на карте</button>
        </div>
      )}
    </div>
  );
};

export default CarCard;