/**
 * @swagger
 * tags:
 *   - name: Options
 *     description: Options module and routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateOptions:
 *       type: object
 *       required:
 *         - title
 *         - key
 *         - category
 *         - type 
 *       properties:
 *         title:
 *           type: string
 *         key:
 *           type: string
 *         category:
 *           type: string
 *         guid:
 *           type: string
 *         required:
 *           type: boolean
 *         type:
 *           type: string
 *           enum:
 *              -   number
 *              -   string
 *              -   boolean
 *              -   array
 *         enum:
 *           type: array
 *           items:
 *              type: string
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateOptions:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         key:
 *           type: string
 *         category:
 *           type: string
 *         guid:
 *           type: string
 *         required:
 *           type: boolean
 *         type:
 *           type: string
 *           enum:
 *              -   number
 *              -   string
 *              -   boolean
 *              -   array
 *         enum:
 *           type: array
 *           items:
 *              type: string
 */
/**
 * @swagger
 * /options:
 *   post:
 *     summary: create a new options list for a category 
 *     tags: [Options]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/CreateOptions'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOptions'
 *     responses:
 *       201:
 *         description: options created successfully
 *   get:
 *     summary: get all options
 *     tags: [Options]
 *     responses:
 *       200:
 *         description: get all options successfully
 * /options/by-category/{categoryId}:
 *   get:
 *     summary: get all options of a category by categoryId
 *     parameters:
 *       -  in: path
 *          name: categoryId
 *          type: string
 *     tags: [Options]
 *     responses:
 *       200:
 *         description: get all options of a category by categoryId successfully
 * /options/by-category-slug/{slug}:
 *   get:
 *     summary: get all options of a category by category-slug
 *     parameters:
 *       -  in: path
 *          name: slug
 *          type: string
 *     tags: [Options]
 *     responses:
 *       200:
 *         description: get all options of a category by slug successfully
 * /options/{id}:
 *   get:
 *     summary: get all options of a category by id
 *     parameters:
 *       -  in: path
 *          name: id
 *          type: string
 *     tags: [Options]
 *     responses:
 *       200:
 *         description: get all options of a category by id successfully
 */
/**
 * @swagger
 * /options/{id}:
 *   delete:
 *     summary: remove an option by id
 *     parameters:
 *       -  in: path
 *          name: id
 *          type: string
 *     tags: [Options]
 *     responses:
 *       200:
 *         description: option deleted by id successfully
 */
/**
 * @swagger
 * /options/{id}:
 *   put:
 *     summary: upate an option list by id
 *     parameters:
 *       -  in: path
 *          name: id
 *          type: string 
 *     tags: [Options]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOptions'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOptions'
 *     responses:
 *       201:
 *         description: options updated successfully
 */