import { Router } from 'express';
import { createAddress, getAddresses, updateAddress, deleteAddress } from '../controllers/addressController.js';

const router = Router();

router.post('/', createAddress);
router.put('/:id', updateAddress);
router.get('/', getAddresses);
router.delete('/:id', deleteAddress)

export default router;
